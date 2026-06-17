# What is Database ?
Database is an organized collection of data that is going to help us to access, review, and update a particular piece of information in a rapid and coherent manner. 

## What is RDBMS? 
RDBMS stands for Relational Database Management System. Mainly, this RDBMS is going to talk about maintaining the data in multiple tables instead of storing it in a single table. 

## What is SQL? 
SQL means Structured Query Language. This is one of the easiest programming languages that we are going to use to interact with the database. By using SQL programming language, we can perform CRUD operations in the database. 

## CRUD Operations ?
- C refers to Create Operations. => CREATE , INSERT
- R refers to read operations. => SELECT
- U refers to update operations. => UPDATE , ALTER
- D refers to delete operations. => DELETE, DROP

# Syntax to create DB Column to store Data : COLUMN_NAME DATA_TYPE CONSTRAINT

## Data Types in SQL ?

### Numeric Data Types (numbers with decimals and without decimals)
SMALLINT => It can store numbers without decimals from -32768 to +32767.  => 2 Bytes
INTEGER => It can store the numbers without decimals from -2147483648 to +2147483647 => 4 bytes
BIGINT => It can store the numbers without decimals from a -19-digit number to a +19-digit number. 

FLOAT => It can store the numbers with decimals up to 6 decimal points. 
DOUBLE => It can store numbers with decimals up to 15 decimal points. 
DECIMAL => It can store up to 16k plus decimal points. 

SMALLSERIAL =>It can store numbers without decimals from 1 to 32,767. 
SERIAL => It can store the numbers without decimals from 1 to +2147483647 
BIGSERIAL =>It can store the numbers without decimals from 1 to a +19-digit number. 

### Character data types 
CHAR(n) => It can store a fixed number of characters. 
VARCHAR(n) => It can store a variable number of characters. 
TEXT => It can store unlimited characters. 

### Boolean Data Type
BOOLEAN => It can store true or false values. 

### DATE AND TIME DATATYPES 
DATE => It can store only date. 
TIME => It can store only time. 
TIMESTAMP => It can store date and time together. 
INTERVAL => It can store the period in the form of minutes, hours, days, months, and years. 

## Operators in SQL ?

### Arithmetic Operators 
Arithmetic operators are nothing but the operators used in the mathematical operations. 
+ Represents addition 
- Represents subtraction 
* Represents multiplication 
/ Represents division 
% Represents modules or reminder 

### Comparison Operators 
Comparison operators are nothing but the operators we are going to use to compare two different values. 
= Refers equal to 
!= Refers not equal to 
> greater than
< less than
>= greater than or equal to
<= less than or equal to

### Logical Operators 
The operators that we are going to use to build the logics by combining multiple conditions together.
AND => It will give you a result as true only if all the conditions are true. 
OR => It will give you a result as true if at least one condition is true. 
NOT => It will give you the opposite result. 
BETWEEN => It will filter the rows within the specific range. 
IN => Filter the rows based on the list of specific values. 
EXISTS => Filter the rows based on the result of the subquery. 
LIKE => Filter the rows based on the pattern. % refers any char, _ refers position
IS NULL => Filter the rows having a null value. 

## Constraints in SQL ?
Constraints in SQL: nothing but conditions added on top of the database columns. 
NOT NULL => The column having a NOT NULL constraint won't allow null values. 
UNIQUE => The column having a unique constraint won't allow duplicate values. 
PRIMARY KEY => The column having a primary key constraint won't allow duplicates and also null values. The primary key is a unique reference to separate each and every row of data. 
FOREIGN KEY => Foreign key constraint is the key that is going to link two different tables, ensuring referential integrity. 
CHECK => Check constraint is going to help us to add custom conditions on top of a database column. 
DEFAULT => Default constraint will help us to store a default value when the user is not updating any data.  


## Default Functions in SQL ?

Default functions are nothing but the default methods provided by the SQL programming language to manipulate the data that we have stored previously within the database. 

### Aggregate functions 
Aggregate functions are all about the functions designed to perform calculations on a set of rows and return a single result. 

COUNT() => It will return the total number of rows available in the table. 
SUM() => It will calculate the sum of all the values in a specific column. => SELECT SUM (SALARY) FROM EMPLOYEE ; 
AVG() => It will calculate the average value in the specific column. 
MIN() => It will return the minimum value available in the particular column. 
MAX() => It will return the maximum value available in the particular column. 

### Numerical Functions 
Numerical functions in SQL are all about the functions that we are going to use to perform mathematical operations. 

ABS() => It will return the absolute value or positive value of the number.  =>SELECT ABS (-123.99)  => 123.99
CEIL() => It will return the nearest next integer value. => SELECT CEIL(125.11) => 126
FLOOR() => It will return the previous integer value. => SELECT FLOOR (125.999) => 125
ROUND() => It will return the rounded value of a particular number based on the decimal point specified.  => SELECT ROUND(125.995,2) => 126.00
POWER() => It will return the power of a specific number. => POWER (2,-2) => 0.25
SQRT() => It will return the square root of a specific number.  => SQRT(49) => 7

## String Functions 
String functions in SQL are used to manipulate and transform the text or character data types. 

LENGTH() => It will return the total number of characters stored in the string. 
UPPER() => It will convert all the characters of the string into uppercase. 
LOWER() => It will convert all the characters of the string into lower case. 
SUBSTRING(COLUMN_NAME START_INDEX TO END_INDEX) => It will extract part of the string based on the start and end index specified. 
TRIM() => It will eliminate leading and trailing spaces from the string. 
CONCAT() => It will join two or more strings and return a single string. 

EX: SELECT SUBSTRING(FAGUN 1 TO 3) => FAG