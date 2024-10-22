UPDATE mytable
SET column = value_or_expr, -- data types must be respected
    other_column = another_value_or_expr, 
    …
WHERE condition; -- dont leave WHERE empty because it means all rows, be cautious

-- you can update more that one column
UPDATE mytable SET a = 5, b = 3, c = 1 WHERE a > 0;
