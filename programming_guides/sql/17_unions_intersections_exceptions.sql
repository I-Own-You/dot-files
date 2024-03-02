-- append the queryset from first query to the second if both have same column count, order and data types
SELECT column, another_column
   FROM mytable
UNION / UNION ALL / INTERSECT / EXCEPT
SELECT other_column, yet_another_column
   FROM another_table
ORDER BY column DESC
LIMIT n;

-- UNION - will discard the duplicate rows
-- UNION ALL - will not discard the duplicate rows
-- INTERSECT - only rows that are in both querysets, discards duplicate rows
-- EXCEPT - only rows that are in the first queryset and not in the second, discard duplicate rows (order sensitive)
-- INTERSECT ALL - check if db implements this
-- EXCEPT ALL - check if db implements this
