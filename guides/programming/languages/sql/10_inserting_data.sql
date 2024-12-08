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

-- psql extension, will fill column from left, the rest will be default, works only in postgres,
-- the default one is listing all the known columns that dont have default values
INSERT INTO products VALUES (1, 'Cheese');

-- you can also explicitly set DEFAULT, it might be more pleasant
INSERT INTO products (product_no, name, price) VALUES (1, 'Cheese', DEFAULT);
-- psql extension, works only in postgres
INSERT INTO products DEFAULT VALUES;

-- it is also possible to insert the result of a query (which might be no rows, one row, or many rows):
INSERT INTO products (product_no, name, price)
SELECT product_no, name, price FROM new_products
WHERE release_date = 'today';
