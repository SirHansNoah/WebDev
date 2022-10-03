# WebDev-Hackathon
**Schema (PostgreSQL v14)**

    CREATE TABLE IF NOT EXISTS test (
      id BIGSERIAL,
      name VARCHAR(255),
      courses text[],
      url varchar(255)
    );
    
    INSERT INTO test (name, url)
    VALUES
      ('Tim', 'https://www.youtube.com/watch?v=tiLWCNFzThE&list=PLwGdqUZWnOp3aROg4wypcRhZqJG3ajZWJ'),
      ('Bob', 'https://www.youtube.com/watch?v=QFaFIcGhPoM&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3');
      
    UPDATE test SET courses = ARRAY_APPEND(courses, 'eyon6bakvnba8b') WHERE name = 'Bob';
    UPDATE test SET courses = ARRAY_APPEND(courses, 'eyon6bakTHba8b') WHERE name = 'Bob';

---

**Query #1**

    SELECT * FROM test WHERE 'eyon6bakvnba8b' = ANY (courses);

| id  | name | courses                       | url                                                                                 |
| --- | ---- | ----------------------------- | ----------------------------------------------------------------------------------- |
| 2   | Bob  | eyon6bakvnba8b,eyon6bakTHba8b | https://www.youtube.com/watch?v=QFaFIcGhPoM&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3 |

---

[View on DB Fiddle](https://www.db-fiddle.com/)