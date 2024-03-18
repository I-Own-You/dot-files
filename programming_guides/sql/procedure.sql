-- kind of function but with some differences:
-- 1. it doesnt have to return a value as function must
-- 2. its more used on data manipulation/validatioin with multiple sql statements
-- 3. can have transaction control clauses like COMMIT/ROLLBACK (function doesnt have these)
-- 4. can be used to encapsulate complex operations within a schema. 

CREATE PROCEDURE GetEmployeeCount
AS
BEGIN
    SELECT COUNT(*) AS EmployeeCount FROM Employees;
END;


EXEC GetEmployeeCount;
