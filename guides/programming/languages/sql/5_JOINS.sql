-- join conditions are specified in ON, USING clauses or NATURAL word
-- ON clause takes a boolean, if satisfied, row is added
-- USING clause is more used when both join tables uses same name for the join column
;USING(a,b) would transfer into ON table1.a = table2.a AND talbe1.b = table2.b
-- USING also produces one output for both columns from 2 tables instead of 2 as ON would produce from table1 then form table2
-- NATURAL produces a USING that takes all columns from both tables and gives 1 output per row for both columns, but if no columns mathc, a cross join is performed(so its risky both ways,)


-------------------------------------------------------- CROSS JOIN
-- corss join means cartesian product, like table1 rows * table2 rows * tableN rows
;
-- all of them produces the same
FROM table1 CROSS JOIN table2
FROM table1, table2

-- this form will also produce a cartesian product
FROM table1 INNER JOIN table2 ON TRUE


------------------------------------------------------- INNER JOIN
SELECT column, another_table_column, …
FROM mytable
INNER JOIN mytable               -- inner join is the same as join, a shorthand
    ON mytable.column = another_table.another_column    
WHERE condition(s)
ORDER BY column, … ASC/DESC
LIMIT num_limit OFFSET num_offset;

--inner join was also written like this before:
select * from mytable1, mytable2
where column = another_column -- or if same values then specify the table where mytable1.column = mytable2.another_column


------------------------------------------------------ OUTER JOIN
SELECT column, another_column, …
FROM mytable
INNER/LEFT/RIGHT/FULL JOIN another_table 
    ON mytable.id = another_table.matching_id
WHERE condition(s)
ORDER BY column, … ASC/DESC
LIMIT num_limit OFFSET num_offset;

-- when tables have different data, no column that can be tied, like with inner join, you have to use eiter: left/right/full join
-- left join means including rows from tableA regardless of weather tableB has a matching row
-- right join same as left join but reverse, keeping rows in tableB regardless of tableA  has matching row or not
-- full join means keeping rows from both tableA&tableB regardless of matching
