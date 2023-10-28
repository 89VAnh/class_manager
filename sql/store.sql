
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

CREATE  PROC sp_student_create_or_update
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

-- CREATE 
ALTER PROCEDURE sp_student_class_create
    @ClassId NVARCHAR(50),
    @Semester INT,
    @SchoolYear NVARCHAR(50),
    @list_json_student NVARCHAR(MAX)
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

    INSERT INTO Class_Student

        (ClassId, StudentId, Semester, SchoolYear
        )
    SELECT @ClassId, Id, @Semester, @SchoolYear
    FROM #TempStudentData;

    DROP TABLE #TempStudentData;
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

        ),
        CTE_Conducts
        AS
        (
            SELECT c.*
            FROM Conduct c INNER JOIN Student_Conduct sc ON c.Id = sc.ConductId
            WHERE sc.Semester = @Semester AND sc.SchoolYear = @SchoolYear

        )

    SELECT ROW_NUMBER() OVER (ORDER BY dbo.func_reverseName(s.Name) COLLATE Vietnamese_CI_AS) AS OrdinalNumber, s.Id AS StudentId, s.Name AS StudentName, s.Birthday AS StudentBirthday, dbo.func_getPointAverage(s.Id,@Semester,@SchoolYear) AS PointAverage, dbo.func_getTotalNumOfCredits(s.Id,@Semester,@SchoolYear) AS TotalNumOfCredits, dbo.func_getTotalNumOfFailCredits(s.Id,@Semester,@SchoolYear) AS TotalNumOfFailCredits, c.*
    FROM CTE_Students s INNER JOIN Student_Conduct sc ON s.Id = sc.StudentId

        INNER JOIN CTE_Conducts c ON sc.ConductId = c.Id
END

GO

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

CREATE PROC sp_monitor_create_or_update(
    @ClassId NVARCHAR(50),
    @MonitorId NVARCHAR(50),
    @Semester INT  ,
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

CREATE PROC sp_account_get_by_username_password(
    @username NVARCHAR(10),
    @password NVARCHAR(200)
)
AS
BEGIN
    SELECT TOP 1
        *
    FROM Account
    WHERE Username = @username AND Password = @password
END

GO

CREATE PROC sp_account_get_by_username(
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

GO

CREATE PROC sp_get_classInfo(@Id NVARCHAR(50))
AS
BEGIN
    SELECT c.Id, c.Name, FormTeacher = l.Name, Department = d.Name,
        AssistantDean = dbo.func_getAssistantDeanName(d.Id), Monitor = dbo.func_getMonitorName(@Id)
    FROM Class c INNER JOIN Lecturer l ON c.FormTeacherId = l.Id
        INNER JOIN Department d ON c.DepartmentId = d.Id
    WHERE c.Id = @Id
END

GO

CREATE PROC sp_get_classes_by_lecturerId(@LecturerId NVARCHAR(50))
AS
BEGIN
    SELECT c.Id, c.Name, FormTeacher = l.Name, Department = d.Name,
        AssistantDean = dbo.func_getAssistantDeanName(d.Id), Monitor = dbo.func_getMonitorName(c.Id)
    FROM Class c
        INNER JOIN Lecturer l ON c.FormTeacherId = l.Id
        INNER JOIN Department d ON c.DepartmentId = d.Id
    WHERE l.Id = @LecturerId
END

GO

CREATE PROC sp_get_schoolYear
AS
BEGIN
    SELECT DISTINCT SchoolYear
    FROM Student_Conduct
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

CREATE PROC sp_class_search(@page_index  INT,
    @page_size   INT,
    @id NVARCHAR(50),
    @name NVARCHAR(50))
AS
BEGIN
    DECLARE @RecordCount BIGINT;
    IF(@page_size <> 0)
            BEGIN
        SET NOCOUNT ON;
        SELECT(ROW_NUMBER() OVER(
                              ORDER BY cl.Name ASC)) AS RowNumber,
            cl.*
        INTO #Results1
        FROM [Class] AS cl
        WHERE (@name IS NULL OR @name = '' OR (cl.Name LIKE '%' + @name + '%')) AND (@id IS NULL OR @id = '' OR (cl.Id LIKE '%' + @id + '%'))
        SELECT @RecordCount = COUNT(*)
        FROM #Results1;
        SELECT *,
            @RecordCount AS RecordCount
        FROM #Results1
        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
            OR @page_index = -1;
        DROP TABLE #Results1;
    END;
            ELSE
            BEGIN
        SET NOCOUNT ON;
        SELECT(ROW_NUMBER() OVER(
                              ORDER BY cl.Name ASC)) AS RowNumber,
            cl.*
        INTO #Results2
        FROM [Class] AS cl
        WHERE (@name IS NULL OR (@name = '') OR (cl.Name LIKE '%' + @name + '%')) AND (@id IS NULL OR @id = '' OR (cl.Id LIKE '%' + @id + '%'))
        SELECT @RecordCount = COUNT(*)
        FROM #Results2;
        SELECT *,
            @RecordCount AS RecordCount
        FROM #Results2;
        DROP TABLE #Results2;
    END;
END;
GO