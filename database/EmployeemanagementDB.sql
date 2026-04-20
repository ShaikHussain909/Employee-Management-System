create database EmployeeManagement
use EmployeeManagement

 create table Users (USerId int identity(1,1) Primary key,
 FullName Nvarchar(100) Not Null,
 Email NVarchar(100) Not Null,
 PasswordHash nvarchar(255) not null,
 Role Nvarchar(20) not null,
 IsActive Bit Default 1,
 CreatedAt Datetime default GETDATE()
 );

 create Table Departments( 
 DepartmentID int Identity (1,1) primary key,
 DepartmentName Nvarchar (100) Not null,
 IsActive bit default 1);

 create Table Designations( 
 DesignationId int Identity(1,1) primary key,
 DesignationName nvarchar(100) not null,
 IsActive bit default 1);


 create table Employees(
 EmpID int identity (1,1) primary key,
 FirstName nvarchar(50) not null,
 LastName nvarchar(50) not null,
 email Nvarchar(100) not null Unique,
 phone Nvarchar(15),
 Salary Decimal(10,2),
 DateOfJoin Date,
 DepartmentId int,
 DesignationId int,
 IsActive Bit Default 1,
 CreatedAt DATETIME default GETDATE(),
  
  constraint FK_Employees_Departments
  Foreign key (DepartmentId) references Departments (DepartmentId),

  constraint FK_Employees_Designations
  Foreign key(DesignationId) references Designations (DesignationId)

  );

  select *from Employees


  DROP TABLE __EFMigrationsHistory;
