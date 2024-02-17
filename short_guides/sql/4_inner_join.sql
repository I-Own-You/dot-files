SELECT column, another_table_column, …
FROM mytable
INNER JOIN another_table               -- inner join is the same as join, a shorthand
    ON mytable.id = another_table.id     
WHERE condition(s)
ORDER BY column, … ASC/DESC
LIMIT num_limit OFFSET num_offset;

-- inner join works only with the data that appears on both tables, like ids or whatever
