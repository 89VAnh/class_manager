
-- Course
CREATE PROC sp_create_multi_course
    @ClassId NVARCHAR(50),
    @Semester INT,
    @SchoolYear NVARCHAR(50),
    @list_json_course NVARCHAR(MAX)
AS
BEGIN
    IF(@list_json_course IS NOT NULL)
    BEGIN
        CREATE TABLE #TempCourse
        (
            Id NVARCHAR(50) PRIMARY KEY,
            Name NVARCHAR(150) NOT NULL,
            NumOfCredits INT
        );

        INSERT INTO #TempCourse
            (Id, Name, NumOfCredits)
        SELECT JSON_VALUE(p.value, '$.id'),
            JSON_VALUE(p.value, '$.name'),
            JSON_VALUE(p.value, '$.numOfCredits')
        FROM OPENJSON(@list_json_course) AS p;

        MERGE INTO Course AS target
    USING #TempCourse AS source
    ON target.Id = source.Id
    WHEN MATCHED THEN
        UPDATE SET
            target.Name = source.Name,
            target.NumOfCredits = source.NumOfCredits
    WHEN NOT MATCHED THEN
        INSERT (Id, Name,NumOfCredits)
        VALUES (source.Id, source.Name, source.NumOfCredits);
    END

    INSERT INTO Class_Course(ClassId, CourseId, Semester, SchoolYear)
    SELECT @ClassId, Id, @Semester, @SchoolYear
    FROM #TempCourse;

    DROP TABLE #TempCourse;
END;

GO

CREATE PROC sp_create_course
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

CREATE PROC sp_get_course(
    @class_id NVARCHAR(50),
    @semester TINYINT ,
    @schoolYear NVARCHAR(50) )
AS
BEGIN
    SELECT c.* FROM Course c INNER JOIN Class_Course cc ON c.Id = cc.CourseId 
    WHERE cc.ClassId = @class_id AND cc.Semester = @semester AND cc.SchoolYear = @schoolYear
END
GO
EXEC sp_get_course '125211',2,'2022-2023'

SELECT * FROM Class_Course
SELECT * FROM Course

GO
-- AssistantDean
CREATE PROC sp_get_AssistantDean_by_departmentId (@departmentId NVARCHAR(50))
AS
BEGIN
    SELECT l.Id,l.Name FROM Lecturer l INNER JOIN AssistantDean a ON l.Id = a.LecturerId 
    WHERE a.DepartmentId = @departmentId
END

GO

-- Student
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
END
GO
CREATE PROC sp_get_student_by_id
    @student_id NVARCHAR(50)
AS
BEGIN
    SELECT
            Id,
            Name,
            Birthday,
            Email,
            Phone,
            Address
    FROM
        Student
    WHERE
        Id = @student_id;
END;
GO

CREATE PROC sp_search_student
     @page_index INT,
    @page_size INT,
    @student_name NVARCHAR(150) = NULL,
    @student_id NVARCHAR(50) = NULL,
    @email NVARCHAR(200) = NULL,
    @phone NVARCHAR(20) = NULL,
    @class_id NVARCHAR(50)= NULL,
    @semester TINYINT = NULL,
    @schoolYear NVARCHAR(50) = NULL
AS
    DECLARE @RecordCount BIGINT;
    SET NOCOUNT ON; 
    SELECT
            (ROW_NUMBER() OVER (ORDER BY dbo.func_reverseName(s.Name) COLLATE Vietnamese_CI_AS)) AS RowNumber,
            s.*
        INTO #Results
        FROM Student s INNER JOIN Class_Student sc ON s.Id = sc.StudentId
        WHERE
            (@class_id IS NULL OR @semester IS NULL OR @schoolYear IS NULL OR sc.ClassId = @class_id AND sc.Semester = @semester AND sc.SchoolYear = @schoolYear) AND
            (@student_name IS NULL OR Name LIKE '%' + @student_name + '%')
            AND (@student_id IS NULL OR Id LIKE '%' + @student_id + '%')
            AND (@email IS NULL OR Email LIKE '%' + @email + '%')
            AND (@phone IS NULL OR Phone LIKE '%' +  @phone + '%');
        SELECT @RecordCount = COUNT(*)
        FROM #Results;

    IF @page_size <> 0
    BEGIN
        SELECT
            *,
            @RecordCount AS RecordCount
        FROM #Results
        WHERE RowNumber BETWEEN (@page_index - 1) * @page_size + 1 AND ((@page_index - 1) * @page_size + 1) + @page_size - 1
            OR @page_index = -1;
    END
    ELSE
    BEGIN
        
        SELECT
            *,
            @RecordCount AS RecordCount
        FROM #Results;
    END;
        DROP TABLE #Results;
GO

CREATE PROC sp_create_student_class(
    @ClassId NVARCHAR(50),

@Semester TINYINT,
    @SchoolYear NVARCHAR(50),

@list_json_student NVARCHAR
(MAX))
AS
BEGIN
    IF(@list_json_student IS NOT NULL)
    BEGIN
        CREATE TABLE #TempStudentData
        (
            Id NVARCHAR(50),
            Name NVARCHAR(255),
            Birthday DATE,
            Email NVARCHAR(255),
            Phone NVARCHAR(20),
            Address NVARCHAR(255)
        );

        INSERT INTO #TempStudentData
            (Id, Name, Birthday, Email, Phone, Address)
        SELECT JSON_VALUE(p.value, '$.id'),
            JSON_VALUE(p.value, '$.name'),
            JSON_VALUE(p.value, '$.birthday'),
            JSON_VALUE(p.value, '$.email'),
            JSON_VALUE(p.value, '$.phone'),
            JSON_VALUE(p.value, '$.address')
        FROM OPENJSON(@list_json_student) AS p;

        MERGE INTO Student AS target
    USING #TempStudentData AS source
    ON target.Id = source.Id
    WHEN MATCHED THEN
        UPDATE SET
            target.Name = source.Name,
            target.Birthday = source.Birthday,
            target.Email = source.Email,
            target.Phone = source.Phone,
            target.Address = source.Address
    WHEN NOT MATCHED THEN
        INSERT (Id, Name, Birthday, Email, Phone, Address)
        VALUES (source.Id, source.Name, source.Birthday, source.Email, source.Phone, source.Address);
    END

    INSERT INTO Class_Student(ClassId, StudentId, Semester, SchoolYear)
    SELECT @ClassId, Id, @Semester, @SchoolYear
    FROM #TempStudentData;

    DROP TABLE #TempStudentData;
END;
GO

CREATE PROC sp_get_fail_courses(@studentId NVARCHAR(50),@semester TINYINT,@schoolYear NVARCHAR(50))
AS 
BEGIN
SELECT c.*
FROM Transcript t INNER JOIN Course c
    ON t.CourseId = c.Id
WHERE StudentId = @studentId
    AND Semester = @semester
    AND SchoolYear = @schoolYear
    AND t.Grade = 'F'
END
GO

--Transcript
CREATE PROC sp_create_transcript
    @StudentId NVARCHAR(50),
    @CourseId NVARCHAR(50),
    @Score FLOAT,
    @Grade NVARCHAR(5),

@Semester TINYINT,
    @SchoolYear NVARCHAR(50)
AS
BEGIN
    INSERT INTO Transcript
        (StudentId, CourseId, Score, Grade, Semester, SchoolYear)
    VALUES
        (@StudentId, @CourseId, ROUND(@Score,2), @Grade, @Semester, @SchoolYear);
END;
GO

CREATE PROC sp_get_transcript_of_student
    @StudentId NVARCHAR(50),
    @ClassId NVARCHAR(50),
    @Semester INT,
    @SchoolYear NVARCHAR(50)
AS
BEGIN
    WITH CTA_courses AS 
    (
        SELECT Id FROM Course c INNER JOIN Class_Course cc ON c.Id = cc.CourseId
        WHERE Semester = @Semester AND SchoolYear = @SchoolYear
    )

    SELECT * FROM Transcript WHERE StudentId = @studentId AND CourseId IN (SELECT Id FROM CTA_courses)
END

GO
-- Conduct
CREATE PROC sp_get_conduct_of_student(
     @studentId NVARCHAR(50),
@semester TINYINT,
    @schoolYear NVARCHAR(50)
   )
AS
BEGIN
SELECT c.*
FROM Student_Conduct sc
INNER JOIN Conduct c ON sc.ConductId = c.Id
WHERE sc.StudentId = @studentId AND sc.SchoolYear = @schoolYear AND sc.Semester = @semester
END

GO
CREATE PROC sp_update_conduct(
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

-- Monitor
CREATE PROC sp_create_or_update_monitor(
    @ClassId NVARCHAR(50),
    @MonitorId NVARCHAR(50),

@Semester TINYINT  ,
    @SchoolYear NVARCHAR(50)
)
AS
BEGIN
    IF NOT EXISTS (SELECT 1
    FROM Monitor
    WHERE ClassId = @ClassId AND Semester = @Semester AND SchoolYear = @SchoolYear)
    BEGIN
        INSERT INTO Monitor
            (ClassId,MonitorId,Semester,SchoolYear)
        VALUES
            (@ClassId, @MonitorId, @Semester, @SchoolYear)
    END
    ELSE
    BEGIN
        UPDATE Monitor SET MonitorId = @MonitorId WHERE ClassId = @ClassId AND Semester = @Semester AND SchoolYear = @SchoolYear
    END
END
GO

CREATE PROC sp_get_monitor_by_classId
    @class_id NVARCHAR(50),
    @semester INT,
    @schoolYear NVARCHAR(50)
AS
BEGIN
    SELECT
        s.*
    FROM
        Monitor AS cm
    JOIN
    
        Student AS s ON cm.MonitorId = s.Id
    WHERE
        cm.ClassId = @class_id AND
        cm.Semester = @semester AND
        cm.SchoolYear = @schoolYear
END;
GO

-- Account
CREATE PROC sp_search_account(
    @page_index INT,
    @page_size INT,
    @username NVARCHAR(10),
    @password NVARCHAR(200),
    @email NVARCHAR(200)
)
AS
BEGIN
   DECLARE @RecordCount BIGINT;
    SET NOCOUNT ON; 
    SELECT
        (ROW_NUMBER() OVER (ORDER BY username)) AS RowNumber,
            *
        INTO #Results
        FROM Account
        WHERE
            (@username IS NULL OR Username LIKE '%' + @username + '%')
            AND (@password IS NULL OR [Password] LIKE '%' + @password + '%')
            AND (@email IS NULL OR Email LIKE '%' + @email + '%')

        SELECT @RecordCount = COUNT(*)
        FROM #Results;

    IF @page_size <> 0
    BEGIN
        SELECT
            *,
            @RecordCount AS RecordCount
        FROM #Results
        WHERE RowNumber BETWEEN (@page_index - 1) * @page_size + 1 AND ((@page_index - 1) * @page_size + 1) + @page_size - 1
            OR @page_index = -1;
    END
    ELSE
    BEGIN
        
        SELECT
            *,
            @RecordCount AS RecordCount
        FROM #Results;
    END;
        DROP TABLE #Results;
END
GO

CREATE PROC sp_login
    @username NVARCHAR(10),
    @password NVARCHAR(200)
AS
BEGIN
    SELECT TOP 1 * FROM Account WHERE Username = @username AND [Password] = @password
END

GO

CREATE PROC sp_get_account_by_username(
    @username NVARCHAR(10)
)
AS
BEGIN
    SELECT TOP 1
        *
    FROM Account
    WHERE Username = @username
END
GO

CREATE PROC sp_account_changePassword(
    @username NVARCHAR(10),
    @password NVARCHAR(200)
)
AS
BEGIN
    UPDATE Account
    SET [Password]=@password
    WHERE Username=@username
END
GO

-- Class
CREATE PROC sp_get_class_by_id(@id NVARCHAR(50))
AS
BEGIN
    SELECT * FROM Class WHERE Id = @id
END
GO

CREATE PROCEDURE sp_create_class
    @Id NVARCHAR(50),
    @Name NVARCHAR(50),
    @FormTeacherId NVARCHAR(10),
    @DepartmentId NVARCHAR(50),
    @FromYear INT,
    @ToYear INT
AS
BEGIN
    INSERT INTO Class (Id, Name, FormTeacherId, DepartmentId, FromYear, ToYear)
    VALUES (@Id, @Name, @FormTeacherId, @DepartmentId, @FromYear, @ToYear);
END;

GO

CREATE PROCEDURE sp_update_class
    @Id NVARCHAR(50),
    @Name NVARCHAR(50),
    @FormTeacherId NVARCHAR(10),
    @DepartmentId NVARCHAR(50),
    @FromYear INT,
    @ToYear INT
AS
BEGIN
    UPDATE Class
    SET
        Name = @Name,
        FormTeacherId = @FormTeacherId,
        DepartmentId = @DepartmentId,
        FromYear = @FromYear,
        ToYear = @ToYear
    WHERE
        Id = @Id;
END;


GO


CREATE PROC sp_delete_class(@id NVARCHAR(50))
AS
BEGIN
    DELETE FROM Class WHERE Id = @id
END

CREATE PROC

GO  

CREATE PROC sp_search_class(@page_index  INT,
    @page_size   INT,
    @id NVARCHAR(50),
    @name NVARCHAR(50),
    @lecturerId NVARCHAR(10),
    @departmentId NVARCHAR(10),
    @year INT
    )
AS
BEGIN
    DECLARE @RecordCount BIGINT;
    SET NOCOUNT ON; 
    SELECT
            (ROW_NUMBER() OVER (ORDER BY c.Id)) AS RowNumber,
            c.*,
            l.Name AS FormTeacher,
            d.Name AS Department
        INTO #Results
        FROM Class c INNER JOIN Lecturer l ON c.FormTeacherId = l.Id
        INNER JOIN Department d ON c.DepartmentId = d.Id
        WHERE
            (@id IS NULL OR c.Id LIKE '%' + @id + '%')
            AND (@name IS NULL OR c.Name LIKE '%' + @name + '%')
            AND (@year IS NULL OR @year >= FromYear AND @year <= ToYear)
            AND (@lecturerId IS NULL OR l.Id = @lecturerId)
            AND (@departmentId IS NULL OR d.Id = @departmentId)
        SELECT @RecordCount = COUNT(*)
        FROM #Results;

    IF @page_size <> 0
    BEGIN
        SELECT
            *,
            @RecordCount AS RecordCount
        FROM #Results
        WHERE RowNumber BETWEEN (@page_index - 1) * @page_size + 1 AND ((@page_index - 1) * @page_size + 1) + @page_size - 1
            OR @page_index = -1;
    END
    ELSE
    BEGIN
        
        SELECT
            *,
            @RecordCount AS RecordCount
        FROM #Results;
    END;
        DROP TABLE #Results;
END;
GO

GO
-- AssistantDean
CREATE PROC sp_get_assistant_dean_by_class(@classId NVARCHAR(50))
AS
BEGIN
    SELECT l.* FROM Lecturer l INNER JOIN AssistantDean ad ON l.Id = ad.LecturerId
    WHERE ad.DepartmentId = (SELECT DepartmentId FROM Class WHERE Id = @classId)
END
GO

-- Lecture
CREATE PROC sp_get_lecturer_by_id
    @id NVARCHAR(50)
AS
BEGIN
    SELECT
           *
    FROM
        Lecturer
    WHERE
        Id = @id;
END;
GO


CREATE PROC  sp_search_lecturer   (@page_index  INT,
    @page_size   INT,
    @id NVARCHAR(50),
    @name NVARCHAR(100),
    @phone NVARCHAR(20),
    @email NVARCHAR(50),
    @departmentId NVARCHAR(10)
    )
AS
BEGIN
    DECLARE @RecordCount BIGINT;
    SET NOCOUNT ON; 
    SELECT
            (ROW_NUMBER() OVER (ORDER BY Id)) AS RowNumber,
            *
        INTO #Results
        FROM Lecturer
        WHERE
            (@id IS NULL OR Id LIKE '%' + @id + '%')
            AND (@name IS NULL OR Name LIKE '%' + @name + '%')
            AND (@phone IS NULL OR Phone LIKE '%' + @phone + '%')
            AND (@email IS NULL OR Email LIKE '%' + @email + '%')
            AND (@departmentId IS NULL OR DepartmentId = @departmentId)
        SELECT @RecordCount = COUNT(*)
        FROM #Results;

    IF @page_size <> 0
    BEGIN
        SELECT
            *,
            @RecordCount AS RecordCount
        FROM #Results
        WHERE RowNumber BETWEEN (@page_index - 1) * @page_size + 1 AND ((@page_index - 1) * @page_size + 1) + @page_size - 1
            OR @page_index = -1;
    END
    ELSE
    BEGIN
        
        SELECT
            *,
            @RecordCount AS RecordCount
        FROM #Results;
    END;
        DROP TABLE #Results;
END;
GO

-- Department
CREATE PROC sp_search_department(@page_index  INT,
    @page_size   INT,
    @id NVARCHAR(50),
    @name NVARCHAR(100)
    )
AS
BEGIN
    DECLARE @RecordCount BIGINT;
    SET NOCOUNT ON; 
    SELECT
            (ROW_NUMBER() OVER (ORDER BY Id)) AS RowNumber,
            *
        INTO #Results
        FROM Department
        WHERE
            (@id IS NULL OR Id LIKE '%' + @id + '%')
            AND (@name IS NULL OR Name LIKE '%' + @name + '%')
        SELECT @RecordCount = COUNT(*)
        FROM #Results;

    IF @page_size <> 0
    BEGIN
        SELECT
            *,
            @RecordCount AS RecordCount
        FROM #Results
        WHERE RowNumber BETWEEN (@page_index - 1) * @page_size + 1 AND ((@page_index - 1) * @page_size + 1) + @page_size - 1
            OR @page_index = -1;
    END
    ELSE
    BEGIN
        
        SELECT
            *,
            @RecordCount AS RecordCount
        FROM #Results;
    END;
        DROP TABLE #Results;
END;
GO