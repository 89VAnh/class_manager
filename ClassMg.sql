CREATE DATABASE ClassManager
GO
USE ClassManager
GO

-- Table

CREATE TABLE Department
(
    Id NVARCHAR(50) PRIMARY KEY,
    Name NVARCHAR(200),
)

CREATE TABLE Lecturer
(
    Id NVARCHAR(10) PRIMARY KEY,
    Name NVARCHAR(150) NOT NULL,
    Phone NVARCHAR(20),
    Email NVARCHAR(50),
    DepartmentId NVARCHAR(50) FOREIGN KEY REFERENCES Department(Id) ON UPDATE CASCADE ON DELETE CASCADE,
)

CREATE TABLE AssistantDean
(
    LecturerId NVARCHAR(10) FOREIGN KEY REFERENCES Lecturer(Id),
    DepartmentId NVARCHAR(50) FOREIGN KEY REFERENCES Department(Id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (LecturerId, DepartmentId)
)

CREATE TABLE Class
(
    Id NVARCHAR(50) PRIMARY KEY,
    Name NVARCHAR(50),
    FormTeacherId NVARCHAR(10) FOREIGN KEY REFERENCES Lecturer(Id) ON UPDATE CASCADE ON DELETE CASCADE,
    DepartmentId NVARCHAR(50) FOREIGN KEY REFERENCES Department(Id)
)

CREATE TABLE Student
(
    Id NVARCHAR(50) PRIMARY KEY,
    Name NVARCHAR(150),
    Birthday DATE,
    Email NVARCHAR(200),
    Phone NVARCHAR(20),
    Address NVARCHAR(250),
)

CREATE TABLE Class_Student
(
    ClassId NVARCHAR(50) FOREIGN KEY REFERENCES Class(Id) ON UPDATE CASCADE ON DELETE CASCADE,
    StudentId NVARCHAR(50) FOREIGN KEY REFERENCES Student(Id) ON UPDATE CASCADE ON DELETE CASCADE,
    Semester INT CHECK (Semester = 1 OR Semester = 2),
    SchoolYear NVARCHAR(50) CHECK (SchoolYear LIKE '[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
    PRIMARY KEY (ClassId,StudentId,Semester,SchoolYear)
)

CREATE TABLE Monitor
(
    ClassId NVARCHAR(50) FOREIGN KEY REFERENCES Class(Id),
    MonitorId NVARCHAR(50) FOREIGN KEY REFERENCES Student(Id) ON UPDATE CASCADE ON DELETE CASCADE,
    Semester INT CHECK (Semester = 1 OR Semester = 2),
    SchoolYear NVARCHAR(50) CHECK (SchoolYear LIKE '[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
    PRIMARY KEY (ClassId, MonitorId,Semester,SchoolYear)
)

CREATE TABLE Course
(
    Id NVARCHAR(50) PRIMARY KEY,
    Name NVARCHAR(150) NOT NULL,
    NumOfCredits INT
)

CREATE TABLE Parents
(
    StudentId NVARCHAR(50) FOREIGN KEY REFERENCES Student(Id) ON UPDATE CASCADE ON DELETE CASCADE,
    Name NVARCHAR(150),
    Phone NVARCHAR(20),
    PRIMARY KEY (StudentId, Name)
)

CREATE TABLE Transcript
(
    StudentId NVARCHAR(50) FOREIGN KEY REFERENCES Student(Id) ON UPDATE CASCADE ON DELETE CASCADE,
    CourseId NVARCHAR(50) FOREIGN KEY REFERENCES Course(Id) ON UPDATE CASCADE ON DELETE CASCADE,
    Point FLOAT,
    Grade NVARCHAR(5),
    Semester INT CHECK (Semester = 1 OR Semester = 2),
    SchoolYear NVARCHAR(50) CHECK (SchoolYear LIKE '[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
    PRIMARY KEY (StudentId,CourseId,Semester,SchoolYear)
)

CREATE TABLE Conduct
(
    Id INT IDENTITY PRIMARY KEY,
    I_1 INT,
    I_2 INT,
    I_3 INT,
    II_1 INT,
    II_2 INT,
    II_3 INT,
    II_4 INT,
    II_5 INT,
    II_6 INT,
    III_1 INT,
    III_2 INT,
    III_3 INT,
    IV_1 INT,
    IV_2 INT,
    IV_3 INT,
    V_1 INT,
    V_2 INT,
)

CREATE TABLE Student_Conduct
(
    StudentId NVARCHAR(50) FOREIGN KEY REFERENCES Student(Id) ON UPDATE CASCADE ON DELETE CASCADE,
    ConductId INT REFERENCES Conduct(Id) ON UPDATE CASCADE ON DELETE CASCADE,
    Semester INT CHECK (Semester = 1 OR Semester = 2),
    SchoolYear NVARCHAR(50) CHECK (SchoolYear LIKE '[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
    PRIMARY KEY (StudentId,Semester,SchoolYear)
)

CREATE TABLE Account
(
    Username NVARCHAR(10) PRIMARY KEY,
    Password NVARCHAR(200) NOT NULL CHECK (LEN(Password) >= 4)
)
GO

-- Trigger

CREATE TRIGGER trg_AddAccount_INSERT_Lecturer
ON Lecturer
AFTER INSERT 
AS
BEGIN
    DECLARE @LecturerId NVARCHAR(10);

    DECLARE CUR_LecturerId CURSOR FOR
    SELECT Id
    FROM inserted

    OPEN CUR_LecturerId;

    FETCH NEXT FROM CUR_LecturerId INTO @LecturerId

    WHILE @@FETCH_STATUS = 0
    BEGIN
        INSERT INTO Account
            (Username, Password)
        VALUES
            (@LecturerId, @LecturerId)

        FETCH NEXT FROM CUR_LecturerId INTO @LecturerId
    END

    CLOSE CUR_LecturerId
    DEALLOCATE CUR_LecturerId
END

GO

CREATE TRIGGER trg_DeleteAccount_DELETE_Lecturer
ON Lecturer
AFTER DELETE 
AS
BEGIN
    DELETE FROM Account 
    WHERE Username IN 
    ( SELECT Id
    FROM deleted)
END
GO

CREATE TRIGGER trg_InsertConduct_INSERT_Class_Student
ON Class_Student
AFTER INSERT
AS
BEGIN
    DECLARE @StudentId NVARCHAR(10);
    DECLARE @Semester INT;
    DECLARE @SchoolYear NVARCHAR(50);

    DECLARE CUR_Student CURSOR FOR
    SELECT StudentId, Semester, SchoolYear
    FROM inserted

    OPEN CUR_Student;

    FETCH NEXT FROM CUR_Student INTO @StudentId,@Semester,@SchoolYear

    WHILE @@FETCH_STATUS = 0
    BEGIN
        INSERT INTO Conduct
            ([I_1], [I_2], [I_3], [II_1], [II_2], [II_3], [II_4], [II_5], [II_6], [III_1], [III_2], [III_3], [IV_1], [IV_2], [IV_3], [V_1], [V_2])
        VALUES
            (6, 2, 2, 3, 4, 6, 4, 4, 4, 10, 5, 5, 10, 2, 8, 0, 0)

        DECLARE @ConductId INT = SCOPE_IDENTITY();

        INSERT INTO Student_Conduct
            (StudentId ,
            ConductId ,
            Semester ,
            SchoolYear )
        VALUES
            (@StudentId, @ConductId, @Semester, @SchoolYear)

        FETCH NEXT FROM CUR_Student INTO @StudentId,@Semester,@SchoolYear
    END

    CLOSE CUR_Student
    DEALLOCATE CUR_Student
END

GO

CREATE TRIGGER trg_DeleteConduct_DELETE_Student
ON Class_Student
FOR DELETE
AS
BEGIN
    DELETE FROM Conduct WHERE (Id IN (
            SELECT ConductId
    FROM Student_Conduct
    WHERE StudentId IN  (SELECT StudentId
    FROM deleted)
        )
)
END

GO
-- Store proceduce

CREATE PROC sp_course_create
    (@Id NVARCHAR(50),
    @Name NVARCHAR(150),
    @NumOfCredits INT)
AS
BEGIN
    IF NOT EXISTS (SELECT 1
    FROM Course
    WHERE Id = @Id)
    BEGIN
        INSERT INTO Course
        VALUES
            (@Id, @Name, @NumOfCredits)
    END
END

GO

CREATE PROC sp_student_create_or_update
    (
    @Id NVARCHAR(50),
    @Name NVARCHAR(150),
    @Birthday DATE,
    @Email NVARCHAR(200),
    @Phone NVARCHAR(20),
    @Address NVARCHAR(250))
AS
BEGIN
    IF NOT EXISTS (SELECT 1
    FROM Student
    WHERE Id = @Id)
    BEGIN
        INSERT INTO Student
            (Id, Name, Birthday, Email, Phone, Address)
        VALUES
            (@Id, @Name, @Birthday, @Email, @Phone, @Address);
    END
    ELSE
    BEGIN
        UPDATE Student
        SET 
            Name = @Name,
            Birthday = @Birthday,
            Email = @Email,
            Phone = @Phone,
            Address = @Address
        WHERE Id = @Id;
    END
END

GO

CREATE PROC sp_student_class_create
    @ClassId NVARCHAR(50),
    @StudentId NVARCHAR(50),
    @Semester INT,
    @SchoolYear NVARCHAR(50)
AS
BEGIN
    IF NOT EXISTS (
        SELECT 1
    FROM Class_Student
    WHERE ClassId = @ClassId
        AND StudentId = @StudentId
        AND Semester = @Semester
        AND SchoolYear = @SchoolYear
    )
    BEGIN
        INSERT INTO Class_Student
            (ClassId, StudentId, Semester, SchoolYear)
        VALUES
            (@ClassId, @StudentId, @Semester, @SchoolYear);
    END;
END;

GO

CREATE PROC sp_transcript_create
    @StudentId NVARCHAR(50),
    @CourseId NVARCHAR(50),
    @Point FLOAT,
    @Grade NVARCHAR(5),
    @Semester INT,
    @SchoolYear NVARCHAR(50)
AS
BEGIN
    INSERT INTO Transcript
        (StudentId, CourseId, Point, Grade, Semester, SchoolYear)
    VALUES
        (@StudentId, @CourseId, ROUND(@Point,2), @Grade, @Semester, @SchoolYear);
END;
GO

CREATE PROC sp_get_ConductOfClass(@ClassId NVARCHAR(50),
    @Semester INT,
    @SchoolYear NVARCHAR(50)
)
AS
BEGIN
    WITH
        CTE_Students
        AS
        (
            SELECT s.Id, s.Name, s.Birthday
            FROM
                Student s
                INNER JOIN
                (SELECT StudentId
                FROM Class_Student
                WHERE ClassId = @ClassId AND Semester = @Semester
                    AND SchoolYear = @SchoolYear) cs
                ON s.Id = cs.StudentId
        )

    SELECT ROW_NUMBER() OVER (ORDER BY dbo.func_reverseName(s.Name) COLLATE Vietnamese_CI_AS) AS OrdinalNumber, s.Id AS StudentId, s.Name AS StudentName, s.Birthday AS StudentBirthday, dbo.func_getPointAverage(s.Id,@Semester,@SchoolYear) AS PointAverage, dbo.func_getTotalNumOfCredits(s.Id,@Semester,@SchoolYear) AS TotalNumOfCredits, dbo.func_getTotalNumOfFailCredits(s.Id,@Semester,@SchoolYear) AS TotalNumOfFailCredits, c.*
    FROM CTE_Students s INNER JOIN Student_Conduct sc ON s.Id = sc.StudentId
        INNER JOIN Conduct c ON sc.ConductId = c.Id
END

GO
-- EXEC sp_get_ConductOfClass'125211',2,'2022-2023'

GO
CREATE PROC sp_conduct_update(
    @Id INT,
    @I_1 INT,
    @I_2 INT,
    @I_3 INT,
    @II_1 INT,
    @II_2 INT,
    @II_3 INT,
    @II_4 INT,
    @II_5 INT,
    @II_6 INT,
    @III_1 INT,
    @III_2 INT,
    @III_3 INT,
    @IV_1 INT,
    @IV_2 INT,
    @IV_3 INT,
    @V_1 INT,
    @V_2 INT)
AS
BEGIN
    UPDATE Conduct SET 
        I_1 = @I_1, 
        I_2 = @I_2, 
        I_3 = @I_3, 
        II_1 = @II_1, 
        II_2 = @II_2, 
        II_3 = @II_3, 
        II_4 = @II_4, 
        II_5 = @II_5, 
        II_6 = @II_6, 
        III_1 = @III_1, 
        III_2 = @III_2, 
        III_3 = @III_3, 
        IV_1 = @IV_1, 
        IV_2 = @IV_2, 
        IV_3 = @IV_3, 
        V_1 = @V_1, 
        V_2 = @V_2
    WHERE Id = @Id
END

GO

-- FUNC

CREATE FUNCTION func_getPointAverage (@StudentId NVARCHAR(50),@Semester INT,@SchoolYear NVARCHAR(50))
RETURNS FLOAT
AS
BEGIN
    DECLARE @PointAverage FLOAT;

    WITH
        CTE_Transcript
        AS
        (
            SELECT CourseId, Point
            FROM Transcript
            WHERE StudentId = @StudentId
                AND Semester = @Semester
                AND SchoolYear = @SchoolYear
        ),
        CTE_Course
        AS
        (
            SELECT Id, NumOfCredits
            FROM Course
        )

    SELECT @PointAverage = SUM(Point*NumOfCredits)/SUM(NumOfCredits)
    FROM CTE_Transcript t INNER JOIN CTE_Course c ON t.CourseId = c.Id

    RETURN ROUND(@PointAverage,2);
END

GO
CREATE  FUNCTION func_getTotalNumOfCredits(@StudentId NVARCHAR(50),@Semester INT,@SchoolYear NVARCHAR(50))
RETURNS INT
AS
BEGIN
    DECLARE @total INT;

    SELECT @total = SUM(c.NumOfCredits)
    FROM Transcript t INNER JOIN Course c
        ON t.CourseId = c.Id
    WHERE StudentId = @StudentId
        AND Semester = @Semester
        AND SchoolYear = @SchoolYear

    RETURN @total
END

GO
-- SELECT dbo.func_getTotalNumOfCredits('12521097',2,'2022-2023')

GO

CREATE FUNCTION func_getFailCredits(@StudentId NVARCHAR(50),@Semester INT,@SchoolYear NVARCHAR(50))
RETURNS TABLE
AS 
RETURN SELECT c.Name, c.NumOfCredits
FROM Transcript t INNER JOIN Course c
    ON t.CourseId = c.Id
WHERE StudentId = @StudentId
    AND Semester = @Semester
    AND SchoolYear = @SchoolYear
    AND t.Grade = 'F'

GO
-- SELECT *
-- FROM dbo.func_getFailCredits('10121537',2,'2022-2023')
GO

CREATE FUNCTION func_getTotalNumOfFailCredits(@StudentId NVARCHAR(50),@Semester INT,@SchoolYear NVARCHAR(50))
RETURNS INT
AS
BEGIN
    DECLARE @Sum INT;

    SELECT @Sum = Sum(NumOfCredits)
    FROM dbo.func_getFailCredits(@StudentId,@Semester,@SchoolYear)

    IF @Sum IS NULL
    BEGIN
        SET @Sum = 0
    END

    RETURN @Sum
END
GO

-- SELECT dbo.func_getSumOfFailCredits('10121197',2,'2022-2023')

GO

CREATE FUNCTION func_reverseName(@FullName NVARCHAR(150))
RETURNS NVARCHAR(150)
AS
BEGIN
    DECLARE @Result NVARCHAR(150);
    DECLARE @lastSpacePosition INT;

    SELECT @lastSpacePosition = LEN(@FullName) + 1 - CHARINDEX(' ', REVERSE(@FullName));

    SET @Result = (SUBSTRING(@FullName,@lastSpacePosition,LEN(@FullName) + 1 - @lastSpacePosition) + ' ' + SUBSTRING(@FullName,0,@lastSpacePosition))

    RETURN @Result
END

GO
-- SELECT dbo.func_reverseName('Ng V A')

GO

CREATE FUNCTION func_getClasses(@FormTeacherId NVARCHAR(10))
RETURNS TABLE
RETURN SELECT Id
FROM Class
WHERE FormTeacherId = @FormTeacherId

GO

-- SELECT *
-- FROM dbo.GetClasses('1242')

GO

