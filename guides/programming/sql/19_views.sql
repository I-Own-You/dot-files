CREATE VIEW myview AS another_view_name -- optional as
SELECT column, column2, columnN
FROM mytable1 
WHERE column = "test";
SELECT * FROM myview;

-- a view is just a query set of an sql statement, you can use views inside views, funcs and etc.
