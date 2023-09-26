
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

CREATE FUNCTION func_getAssistantDeanName(@DepartmentId NVARCHAR(50))
RETURNS NVARCHAR(150)
BEGIN
    DECLARE @name NVARCHAR(150);

    SELECT @name  = l.Name
    FROM Department d INNER JOIN AssistantDean a ON d.Id = a.DepartmentId
        INNER JOIN Lecturer l ON a.LecturerId = l.Id
    WHERE d.Id = @DepartmentId

    RETURN @name
END
GO

CREATE FUNCTION func_getMonitorName(@ClassId NVARCHAR(50))
RETURNS NVARCHAR(150)
BEGIN
    DECLARE @name NVARCHAR(150);

    SELECT @name  = s.Name
    FROM Monitor m
        INNER JOIN Student s ON m.MonitorId = s.Id
    WHERE m.ClassId = @ClassId

    RETURN @name
END
 GO

PRINT dbo.func_getMonitorName('125211')