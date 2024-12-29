select distinct column, another_column, ...
from table
where condition(s);   --(distinct - discard duplicate rows)


select column, another_column, ...
from table
where condition(s)
order by column asc/desc;   --(order by - lets you sort rows by some column in ascending/descending order based on the column value(alpha-numeric))

select column, another_column, …
from table
where condition(s)
order by column asc/desc
limit num_limit offset num_offset; --(limit - lets you specify the number of rows will be returned; offset - lets you specify where to begin counting the number rows from)
