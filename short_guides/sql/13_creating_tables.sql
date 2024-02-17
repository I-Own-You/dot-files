CREATE TABLE IF NOT EXISTS mytable (
    column DataType TableConstraint DEFAULT default_value,
    another_column DataType TableConstraint DEFAULT default_value,
    …
);


-- some data types in a table:
    -- integer, boolean
    -- float, double, real
    -- character(num_chars), varchar(num_chars), text
    -- date, datetime
    -- blob

-- some table constraints (limitations or rules that columns must respect when inserting data)
    -- primary key
    -- autoincrement
    -- unique
    -- not null
    -- check (expression) (basically means check for something, set of rules, etc.)
    -- foreign key (means the row added to the table has a column with the same value in another related table)
