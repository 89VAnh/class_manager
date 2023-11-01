
CREATE TRIGGER trg_add_Account_INSERT_Lecturer
ON Lecturer
AFTER INSERT 
AS
BEGIN 
    DECLARE @LecturerId NVARCHAR(10);
    DECLARE @LecturerName NVARCHAR(150);
    DECLARE @LecturerEmail NVARCHAR(200);

    DECLARE CUR_LecturerId CURSOR FOR
    SELECT Id, Name, Email
    FROM inserted

    OPEN CUR_LecturerId;

    FETCH NEXT FROM CUR_LecturerId INTO @LecturerId,@LecturerName,@LecturerEmail

    WHILE @@FETCH_STATUS = 0
    BEGIN
        INSERT INTO Account
            (Username, Password, Name, Email)
        VALUES
            (@LecturerId, @LecturerId, @LecturerName, @LecturerEmail)

        FETCH NEXT FROM CUR_LecturerId INTO @LecturerId,@LecturerName,@LecturerEmail
    END

    CLOSE CUR_LecturerId
    DEALLOCATE CUR_LecturerId
END

GO

CREATE TRIGGER trg_delete_Account_DELETE_Lecturer
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

CREATE TRIGGER trg_insert_Conduct_INSERT_Class_Student
ON Class_Student
AFTER INSERT
AS
BEGIN
    DECLARE @StudentId NVARCHAR(10);

DECLARE @Semester TINYINT;
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
            (6, 0, 1, 3, 4, 6, 4, 4, 4, 10, 5, 5, 10, 2, 8, 0, 0)

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

CREATE TRIGGER trg_delete_Conduct_DELETE_Student
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