CREATE DATABASE ClassManager
GO
USE ClassManager
GO

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
    Email NVARCHAR(200),
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
    PRIMARY KEY (ClassId, MonitorId, Semester, SchoolYear)
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
    Password NVARCHAR(200) NOT NULL CHECK (LEN(Password) >= 4),
    Name NVARCHAR(150),
    Email NVARCHAR(200)
)
GO
