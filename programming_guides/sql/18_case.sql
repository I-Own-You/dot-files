SELECT
  column, column_n, ...
  CASE 
    WHEN condition_1 THEN result_1
    WHEN condition_2 THEN result_2
    WHEN ... THEN ...
    ELSE result_3 -- If no condition matches, return the result in ELSE clause
                  -- if no else is present, the NULL will be instead
  END AS new_column_name
  from my_table;
