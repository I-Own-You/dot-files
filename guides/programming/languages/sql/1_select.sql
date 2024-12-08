-- a table expressioin computes a table, a table expression contains a FROM clause
-- you can select from base tables(the one stored on disk),or computed expressions (tables that will be creatd on the fly, they are called virtual tables)

select column_name, another_column_name, ...
from table_name;

select * from table_name; -- (* - will retrieve all columns)

-- you can also use multiple columns for some operations
SELECT a, b + c FROM table1;

-- you can also omit the table
SELECT 3 * 4; -- will give 12

-- you can also use functions which are useful, like random()
SELECT random()

-- you can specify more than 1 table after FORM clause, they will be corss-joined
FROM table1, table2, tableN;
;
-- if a table which is parent for other tables is specified, rows are produced for them also
-- if ONLY is specified, then only its rows will be proccessed
FROM ONLY table1 -- rows from table1 only, not descendants
FROM table1* -- rows from descendants also, its the default behaviour, so dont use the notation
