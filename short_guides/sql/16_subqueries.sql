SELECT *
FROM sales_associates
WHERE salary > 
   (SELECT AVG(revenue_generated)
    FROM sales_associates);

-- this is a correlated query, the inner query is dependent on each outer query row
SELECT *
FROM employees
WHERE salary > 
   (SELECT AVG(revenue_generated)
    FROM employees AS dept_employees
    WHERE dept_employees.department = employees.department);

-- it checks if our column has a value in columns of a subquery, powerful but be  cautious
-- the column name doesnt have to be the same so it will check against all columns
SELECT *, …
FROM mytable
WHERE column
    IN/NOT IN (SELECT another_column FROM another_table);
