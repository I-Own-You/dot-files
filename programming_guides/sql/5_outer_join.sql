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
