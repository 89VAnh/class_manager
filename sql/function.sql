
CREATE FUNCTION func_get_pointAverage (@StudentId NVARCHAR(50),@Semester TINYINT,@SchoolYear NVARCHAR(50))
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
CREATE  FUNCTION func_get_totalNumOfCredits(@StudentId NVARCHAR(50),@Semester TINYINT,@SchoolYear NVARCHAR(50))
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

CREATE FUNCTION func_get_failCredits(@StudentId NVARCHAR(50),@Semester TINYINT,@SchoolYear NVARCHAR(50))
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

CREATE FUNCTION func_get_totalNumOfFailCredits(@StudentId NVARCHAR(50),@Semester TINYINT,@SchoolYear NVARCHAR(50))
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

CREATE FUNCTION func_get_assistantDeanName(@DepartmentId NVARCHAR(50))
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

CREATE FUNCTION func_get_monitorName(@ClassId NVARCHAR(50),@Semester TINYINT, @SchoolYear  NVARCHAR(50))
RETURNS NVARCHAR(150)
BEGIN
    DECLARE @name NVARCHAR(150);

    SELECT @name  = s.Name
    FROM Monitor m
        INNER JOIN Student s ON m.MonitorId = s.Id
WHERE m
.ClassId = @ClassId AND m.Semester = @Semester AND m.SchoolYear = @SchoolYear

    RETURN @name
END
GO