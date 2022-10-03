import express from 'express';
import pool from '../db.js';
import {authenticateToken} from '../middleware/authorization.js';

const router = express.Router();

router.get('/',authenticateToken, async (req, res) => {
    try {
        // console.log(req.cookies);
        const courses = await pool.query('SELECT * FROM courses');
        res.json({courses : courses.rows});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post('/',authenticateToken, async (req, res) => {
    try {
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const course = await pool.query(
            'SELECT * FROM courses WHERE course_name=$1 AND course_instructor=$2'
            , [req.body.course_name, req.body.course_instructor]
        );
        if (course.rows.length !== 0) return res.status(403).json({error:"Course already exists."});
        await pool.query(
            'INSERT INTO courses (course_name,course_price,course_instructor) VALUES ($1,$2,$3) RETURNING *'
            , [req.body.course_name, req.body.course_price, req.body.course_instructor]
        );
        res.status(200).send({message: "Course added successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.put('/add_course', authenticateToken, async (req, res) => {
    try {
        const course = await pool.query(
            'SELECT * FROM users WHERE $1 = ANY (courses)'
            , [req.body.course_id]
        );
        if(course.rows.length !== 0) return res.status(403).json({error: "Already subscribed to the course."});
        await pool.query(
            'UPDATE users SET courses = ARRAY_APPEND(courses, $1) WHERE user_id = $2'
            , [req.body.course_id, req.body.user_id]
        );
        const courseDetails = await pool.query(
            'SELECT course_name, course_instructor FROM courses WHERE course_id=$1'
            , [req.body.course_id]
        );
        res.status(200).send({
            message: `Successfully subscribed to the course ${courseDetails.rows[0].course_name} by ${courseDetails.rows[0].course_instructor}.`
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default router;