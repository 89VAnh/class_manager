SELECT * FROM Course

SELECT * FROM Class_Student

SELECT * FROM Conduct

SELECT * FROM Transcript

SELECT * FROM Class_Course

SELECT * FROM Conduct

DELETE FROM Class_Course WHERE CourseId = '151023' OR CourseId = '151907'

DELETE FROM Class_Student
DELETE FROM Student
DELETE FROM Transcript
DELETE FROM Student_Conduct
DELETE FROM Conduct
DELETE FROM Class_Course

SELECT * FROM Account

SELECT *  FROM Class c INNER JOIN Lecturer l ON c.FormTeacherId = l.Id
        INNER JOIN Department d ON c.DepartmentId = d.Id

SELECT * FROM Class c INNER JOIN Department d ON c.DepartmentId = d.Id

SELECT * FROM CLASS