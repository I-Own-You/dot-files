SELECT AGG_FUNC(column_or_expression) AS aggregate_description, …
FROM mytable
WHERE constraint_expression;

SELECT AGG_FUNC(column_or_expression) AS aggregate_description, …
FROM mytable
WHERE constraint_expression
GROUP BY column --The GROUP BY clause works by grouping rows that have the same value in the column FROMspecified.
HAVING constraint_expression -- HAVING is specifcally used with GROUP BY expression to add additioinal filtering,
                             -- for result rows that were grouped.
                             -- like WHERE for SELECT. You can also use it without GROUP BY


-- aggregation means using a function on a result set, you can specify more than 1 aggregation function 
-- if no where constraint is specified, the aggegation functions will run on all rows from the table

-- some common aggregation functions:
COUNT(*), -- counts the number of rows in the group if no column name is specified.
COUNT(column) -- count the number of rows in the group with non-NULL values in the specified column.
MIN(column)	-- Finds the smallest numerical value in the specified column for all rows in the group.
MAX(column)	-- Finds the largest numerical value in the specified column for all rows in the group.
AVG(column)	-- Finds the average numerical value in the specified column for all rows in the group.
SUM(column)	-- Finds the sum of all numerical values in the specified column for the rows in the group.
