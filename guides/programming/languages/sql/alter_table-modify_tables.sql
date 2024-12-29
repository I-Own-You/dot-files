-- add a new column to a table
-- if no default value is specified, NULLs will be instead
ALTER TABLE products ADD COLUMN description text;

-- from PostgreSQL 11, adding a column with a constant default value
-- no longer means that each row of the table needs to be updated when the ALTER TABLE statement is executed.
-- instead, the default value will be returned the next time the row is accessed, and applied when the table is rewritten
-- making the ALTER TABLE very fast even on large tables.

-- however, if the default value is volatile (e.g., clock_timestamp())
-- each row will need to be updated with the value calculated at the time ALTER TABLE is executed.
-- to avoid a potentially lengthy update operation,
-- particularly if you intend to fill the column with mostly nondefault values anyway,
-- it may be preferable to add the column with no default,
-- insert the correct values using UPDATE, and then add any desired default as described below.

-- define constraints on a column
-- you can use all constraint here as you can on CREATE TABLE command
-- the constraint will be checked immediately, so the table data must satisfy the constraint before it can be added. (this means existing data will also be chcked)
ALTER TABLE products ADD COLUMN description text CHECK (description <> '');
-- you can add a column and add constraint after it as separate sql command
ALTER TABLE products ADD CHECK (name <> '');
ALTER TABLE products ADD CONSTRAINT some_name UNIQUE (product_no);
ALTER TABLE products ADD FOREIGN KEY (product_group_id) REFERENCES product_groups;
-- to add a not-null constraint, which cannot be written as a table constraint
ALTER TABLE products ALTER COLUMN product_no SET NOT NULL;

-- remove a column
-- if its referenced by a FOREIGN KEY, it wont drop the column
ALTER TABLE products DROP COLUMN description;
-- remove a column with FOREIGN KEY being referencing
ALTER TABLE products DROP COLUMN description CASCADE; -- CASCADE at the end

-- remove a constraint
-- you need to know its name, if you didnt add a name to it, system generates one, and you will need to found out \d tablename in terminal or GUI, .etc
-- If you are dealing with a generated constraint name like $2, you'll need to double-quote it to make it a valid identifier.
ALTER TABLE products DROP CONSTRAINT some_name;
-- to drop a constraint taht is referenced somehow , by a FOREING KEY for example, you need to use CASCADE at the end
ALTER TABLE products DROP CONSTRAINT some_name CASCADE;
-- to drop a not null constraint there is another syntax, becuase NOT NULL csontraints dont have a name
ALTER TABLE products ALTER COLUMN product_no DROP NOT NULL;

-- changing default value of a a column
-- this changes the default values only for newly added data, not old
ALTER TABLE products ALTER COLUMN price SET DEFAULT 7.77;
-- to remove default value of a column
-- this will actaully set the DEFAULT NULL as its the default behaviour, so its okay
ALTER TABLE products ALTER COLUMN price DROP DEFAULT;

-- change a column data type
-- in this syntax it will only work if old data can be casted implicitly into new defined type
ALTER TABLE products ALTER COLUMN price TYPE numeric(10,2);
-- for a more complex type use USING clause to define how exaclty should old data be computed
-- constraints will be applied also, so new type must follow the rulles anyway
-- conversion sometime might fail or produce surprising results
-- its often a good appraoch to drop all constraint and then apply new ones modifying them to suit new type

-- rename a column
ALTER TABLE products RENAME COLUMN product_no TO product_number;

-- rename a table
ALTER TABLE products RENAME TO items;
