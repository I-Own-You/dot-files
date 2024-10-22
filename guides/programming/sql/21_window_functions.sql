-- window function performs a calculation accross a set of rows that are somehow realted to the curren row
-- like aggregate function but the result is kept for all rows, they dont compress into one
SELECT depname, empno, salary, avg(salary) OVER (PARTITION BY depname) FROM empsalary;
  depname  | empno | salary |          avg
-----------+-------+--------+-----------------------
 develop   |    11 |   5200 | 5020.0000000000000000
 develop   |     7 |   4200 | 5020.0000000000000000
 develop   |     9 |   4500 | 5020.0000000000000000
 develop   |     8 |   6000 | 5020.0000000000000000
 develop   |    10 |   5200 | 5020.0000000000000000
 personnel |     5 |   3500 | 3700.0000000000000000
 personnel |     2 |   3900 | 3700.0000000000000000
 sales     |     3 |   4800 | 4866.6666666666666667
 sales     |     1 |   5000 | 4866.6666666666666667
 sales     |     4 |   4800 | 4866.6666666666666667
(10 rows)
-- PARTITION BY makes window function to work on the set of rows where rows column has the same values, it basically divides rows into groups of same values

SELECT depname, empno, salary,
       rank() OVER (PARTITION BY depname ORDER BY salary DESC)
FROM empsalary;
  depname  | empno | salary | rank
-----------+-------+--------+------
 develop   |     8 |   6000 |    1
 develop   |    10 |   5200 |    2
 develop   |    11 |   5200 |    2
 develop   |     9 |   4500 |    4
 develop   |     7 |   4200 |    5
 personnel |     2 |   3900 |    1
 personnel |     5 |   3500 |    2
 sales     |     1 |   5000 |    1
 sales     |     4 |   4800 |    2
 sales     |     3 |   4800 |    2
(10 rows)
-- ORDER BY can help controll in which order will window functions process rows
-- rank() produces a numerical rank for each distinct ORDER BY, duplicate value rows will have identical rank
;


-- if we omit any window function expression like in OVER() then window frame(the row set that will be proccessed) will be all rows of the table
SELECT salary, sum(salary) OVER () FROM empsalary;
 salary |  sum
--------+-------
   5200 | 47100
   5000 | 47100
   3500 | 47100
   4800 | 47100
   3900 | 47100
   4200 | 47100
   4500 | 47100
   4800 | 47100
   6000 | 47100
   5200 | 47100
(10 rows)

SELECT salary, sum(salary) OVER (ORDER BY salary) FROM empsalary;
 salary |  sum
--------+-------
   3500 |  3500
   3900 |  7400
   4200 | 11600
   4500 | 16100
   4800 | 25700 -- duplicate have same
   4800 | 25700 -- duplicate have same
   5000 | 30700
   5200 | 41100 -- duplicate have same
   5200 | 41100 -- duplicate have same
   6000 | 47100
(10 rows)
-- but if we specify ORDER BY, window function will process whole table(because PARTITION BY isnt present), so the window frame now will process each row untill current
-- duplicate value rows will have same value as first encounter

-- window function are allowed only in SELECT and ORDER BY clauses
-- window functioins execute after non-window aggregate functions

;
-- here is an example of sub-select with window functioins
SELECT depname, empno, salary, enroll_date
FROM
  (SELECT depname, empno, salary, enroll_date,
          rank() OVER (PARTITION BY depname ORDER BY salary DESC, empno) AS pos
     FROM empsalary
  ) AS ss
WHERE pos < 3;

-- if a query involves multiple window function calls you can group them with WINDOW, you could also write as in other example, but it becomes too long and error prone
SELECT sum(salary) OVER w, avg(salary) OVER w
  FROM empsalary
  WINDOW w AS (PARTITION BY depname ORDER BY salary DESC);

-- window functions also have an frame_clause that can specify which rows are affected:
SELECT
    column1,
    column2,
    window_function() OVER (
        PARTITION BY partition_column
        ORDER BY order_column
        frame_clause -- the optional one that can specify which rows are affected
    -- more here https://www.postgresql.org/docs/current/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS
    ) AS result
FROM
    table_name;
