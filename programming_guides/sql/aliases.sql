-- psql allows to not specify AS but the standart sql must have it, also for portability its a good reason
-- you can shorten a name of a table with AS or by specifying a name near the talbe name
;FROM table_reference AS alias
FROM table_reference alias
SELECT * FROM some_very_long_table_name s JOIN another_fairly_long_name a ON s.id = a.num;

-- once an alias is speicifed, you can use the original name

-- when a self join is made, aliases are convinient to use
SELECT * FROM people AS mother JOIN people AS child ON mother.id = child.mother_id;

-- you can use paranthesis to change order/logic
SELECT * FROM my_table AS a CROSS JOIN my_table AS b ...
SELECT * FROM (my_table AS a CROSS JOIN my_table) AS b ...

SELECT a.* FROM my_table AS a JOIN your_table AS b ON ... -- valid
SELECT a.* FROM (my_table AS a JOIN your_table AS b ON ...) AS c -- not valid, because a table is not visible outside
                                                                 -- paranthesis, its c table instead
