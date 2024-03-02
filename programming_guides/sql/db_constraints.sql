;
CHECK:
-- CHECK constraint lets column or table use some expression before inserting/updating data
-- should be used with a column inside expression, this is the point of it
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric CHECK (price > 0)
);

-- you can also give a name to reffer to or to read better errors with the name of it
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric CONSTRAINT positive_price CHECK (price > 0)
);

-- you can also have constraints at a table level
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric CHECK (price > 0),
    discounted_price numeric CHECK (discounted_price > 0),
    CHECK (price > discounted_price) 
);

-- be aware that table constraints is not supported everywhere,
-- so to stick with all db systems you should define only column constraints level
-- it means define column constraints only for columns you refer to, not for other, for others you have table level constraints 
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric,
    CHECK (price > 0),
    discounted_price numeric,
    CHECK (discounted_price > 0), -- better at column for all db systems
    CHECK (price > discounted_price)
    CHECK (discounted_price > 0 AND price > discounted_price)
);

-- a check constraint is satisfied with null/true also, so if expression value will be not false but null/true, it will be satisifed
-- so null are not prevented in the columns, to ensure null isnt inserted you must use NOT NULL constraint
-- CHECK constraint should not include columns from another table, more info: https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-CHECK-CONSTRAINTS

;
NOT NULL:
-- NOT NULL constraint means no null value can be assigned to a column
CREATE TABLE products (
    product_no integer NOT NULL,
    name text NOT NULL,
    price numeric
);
-- NOT NULL can also be written as CHECK (column IS NOT NULL), but NOT NULL is more efficient, the only downside is you cannnot name the constraint NOT NULL anything else
-- you can also put NULL but only in psql, but its the default behaviour, just explicit, means column can be NULL:
CREATE TABLE products (
    product_no integer NULL,
    name text NULL,
    price numeric
);

;
UNIQUE:
-- unique constraint means rows cannot have same value on the defined columns, NULL doesnt count unless specified to
CREATE TABLE products (
    product_no integer UNIQUE,
    name text,
    price numeric
);
-- table leve
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric,
    UNIQUE (product_no, name) -- or UNIQUE(product_no), single
);

-- you can also assign a name to it
CREATE TABLE products (
    product_no integer CONSTRAINT must_be_different UNIQUE,
    name text,
    price numeric
);

-- when assigning UNIQUE, a B-tree index is created for column
-- covering specific rows cannot be done with UNIQUE, but can be done with partial indexes: https://www.postgresql.org/docs/current/indexes-partial.html

-- NULLs by default are not considered UNIQUE so they are allowed
-- to specify that they should be treated as UNIQUE you must specify it:
CREATE TABLE products (
    product_no integer UNIQUE NULLS NOT DISTINCT,
    name text,
    price numeric
);
--table lever
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric,
    UNIQUE NULLS NOT DISTINCT (product_no) -- NULLS DISTINCT is the sql default
);

;
PRIMARY KEY:
-- a primary key constraint means a row can be uniquely identified in a table, so value must be UNIQUE and NOT NULL:
-- it will automatically create a B-index(indexes) tree as for UNIQUE
CREATE TABLE products (
    product_no integer UNIQUE NOT NULL,
    name text,
    price numeric
);
-- same as 
CREATE TABLE products (
    product_no integer PRIMARY KEY,
    name text,
    price numeric
);
-- you can have more than one primary key columns
CREATE TABLE example (
    a integer,
    b integer,
    c integer,
    PRIMARY KEY (a, c)
);
