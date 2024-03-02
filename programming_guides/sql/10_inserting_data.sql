INSERT INTO mytable
VALUES (value_or_expr, another_value_or_expr, …), -- data types must be respected
       (value_or_expr_2, another_value_or_expr_2, …),
       …;


INSERT INTO mytable
(column, another_column, …) -- if you have columns with default values you can skip them
                            -- by defining here only the columns where the data should be entered
VALUES (value_or_expr, another_value_or_expr, …),
      (value_or_expr_2, another_value_or_expr_2, …),
      …;
