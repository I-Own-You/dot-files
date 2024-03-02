SELECT column, another_table_column, …
FROM mytable
INNER JOIN another_table               -- inner join is the same as join, a shorthand
    ON mytable.id = another_table.id     
WHERE condition(s)
ORDER BY column, … ASC/DESC
LIMIT num_limit OFFSET num_offset;

-- inner join works only with the data that appears on both tables, like ids or whatever


-- self join is also a thing
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

