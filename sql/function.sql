
-- GO
-- CREATE  FUNCTION func_get_totalNumOfCredits(@StudentId NVARCHAR(50),@Semester TINYINT,@SchoolYear NVARCHAR(50))
-- RETURNS INT
-- AS
-- BEGIN
--     DECLARE @total INT;

--     SELECT @total = SUM(c.NumOfCredits)
--     FROM Transcript t INNER JOIN Course c
--         ON t.CourseId = c.Id
--     WHERE StudentId = @StudentId
--         AND Semester = @Semester
--         AND SchoolYear = @SchoolYear

--     RETURN @total
-- END

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