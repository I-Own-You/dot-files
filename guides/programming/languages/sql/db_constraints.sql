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
;
FOREIGN KEY:
-- specifies that the values in a column (or a group of columns) must match the values appearing in some row of another table. (it means maintaining the referential integrity between two related tables.)
CREATE TABLE products ( -- this is referenced table
    product_no integer PRIMARY KEY, -- referenced column
    name text,
    price numeric
);
CREATE TABLE orders ( -- this table is referencing the products table
    order_id integer PRIMARY KEY,
    product_no integer REFERENCES products (product_no), -- now this field cant be NULL, event though we didnt specify NOT NULL
                                                         -- now this is a referencing column
    quantity integer
);

-- you can also not specify the referenced column, it will automatically be the PRIMARY KEY from the referenced table:
CREATE TABLE orders (
    order_id integer PRIMARY KEY,
    product_no integer REFERENCES products, -- product_no automatically will become referenced, becuase its PRIMARY KEY
    quantity integer
);

-- a foreign key can also constrain and reference a group of columns, needs to be written in table constraint form
CREATE TABLE t1 (
  a integer PRIMARY KEY,
  b integer,
  c integer,
  FOREIGN KEY (b, c) REFERENCES other_table (c1, c2) -- columns need to match in all aspects(number of columns and data types)
);

-- self-referential foreign key is also common:
CREATE TABLE tree (
    node_id integer PRIMARY KEY,
    parent_id integer REFERENCES tree,
    name text,
    ...
    -- A top-level node would have NULL parent_id, while non-NULL parent_id entries would be constrained to reference valid rows of the table.
);

-- table can have more than one foreign key constraint.
-- this is used to implement many-to-many relationships between tables
CREATE TABLE products (
    product_no integer PRIMARY KEY, -- referenced
    name text,
    price numeric
);
CREATE TABLE orders (
    order_id integer PRIMARY KEY, -- referenced
    shipping_address text,
    ...
);
CREATE TABLE order_items (
    product_no integer REFERENCES products, -- referencing product_no from products, its also PK
    order_id integer REFERENCES orders, -- referencing order_id from orders, its also PK
    quantity integer, -- common field, just added for example
    PRIMARY KEY (product_no, order_id) -- they are also PRIMARY KEY
);

-- we also can make a relation between referencing and referenced tables based on deletion or update of the columns:
CREATE TABLE products (
    product_no integer PRIMARY KEY,
    name text,
    price numeric
);
CREATE TABLE orders (
    order_id integer PRIMARY KEY,
    shipping_address text,
    ...
);

CREATE TABLE order_items (
    product_no integer REFERENCES products ON DELETE RESTRICT, -- it means dont allow the deletion of the rows
                                                               -- referencing products
    order_id integer REFERENCES orders ON DELETE CASCADE, -- it means delete all rows that references the orders table
    quantity integer,
    PRIMARY KEY (product_no, order_id)
);

-- some actions:
-- RESTRICT - do not allow the deletion
-- NO ACTION - the default, raises an error if rules are broken, but if specified,allows the check to be deferred until later in the transaction
-- CASCADE - if a referenced row is deleted, all rows referencing it should be deleted
-- SET NULL - referencing rows will be set to NULL, but any constraints on the row will still be checked, so if there is NOT NULL or an custom expression that checks for NON NULL, SET NULL will fail
-- SE DEFAULT - will set the default value that is set with DEFAULT value constraint, but it will check other constraints as well, so it can fail

-- SET NULL and SET DEFAULT can take more than 1 column, but this is some special case where you want cusotm logic
CREATE TABLE tenants (
    tenant_id integer PRIMARY KEY
);

CREATE TABLE users (
    tenant_id integer REFERENCES tenants ON DELETE CASCADE,
    user_id integer NOT NULL,
    PRIMARY KEY (tenant_id, user_id)
);

CREATE TABLE posts (
    tenant_id integer REFERENCES tenants ON DELETE CASCADE,
    post_id integer NOT NULL,
    author_id integer,
    PRIMARY KEY (tenant_id, post_id),
    FOREIGN KEY (tenant_id, author_id) REFERENCES users ON DELETE SET NULL (author_id) -- tenant_id wont be set to NULL
                                                                                   -- because only author_id is specified
);
-- you can also define another name for foreign key constraints without letting sql autogenerate it for you:
-- CONSTRAINT my_name FOREIGN KEY (existing_field) REFERENCES referencedTableName

-- ON UPDATE has the same actions with some changes:
-- 1. column list cannot be specified for SET NULL and SET DEFAULT, it means SET NULL/DEFAULT(col1,coln)
-- 2. CASCADE - means the updated referenced row will be copied into referencing row

-- normally, a referencing row need not satisfy the foreign key constraint if any of its referencing columns are null.
-- if MATCH FULL is added to the foreign key declaration, a referencing row escapes satisfying the constraint only
-- if all its referencing columns are null:
-- (so a mix of null and non-null values is guaranteed to fail a MATCH FULL constraint).
-- if you don't want referencing rows to be able to avoid satisfying the foreign key constraint,
-- declare the referencing column(s) as NOT NULL.

-- foreign key must reference PK or a column with unique constraint or non-partial index
-- it means referenced column have an index to allow efficient lookups for referencing rows
-- DELETE or UPDATE of a referencced table will require a lookup of referencing rows from referening table,
-- its a good idea to index the referencing columns.
-- foreign keys are not indexed by default, only PK
;
EXCLUDE:
-- ensure that if any two rows are compared on the specified columns or expressions using the specified operators, at least one of these operator comparisons will return false or null.
-- An exclusion constraint is a rule that ensures certain conditions cannot be true at the same time
-- adding an exclusion constraint will automatically create an index of the type specified in the constraint declaration.
CREATE TABLE circles (
    c circle,
    EXCLUDE USING gist (c WITH &&)
    -- USING gist is a type of index used for exclude constraint
    -- (c WITH &&) the expression that defines the condition to exclude
    -- && used to check if two circles overlap, so when 2 circles will be compared with &&, if they overlap, it will fail
);

-- check
-- not null
-- unique
-- primary key
-- foreign key (references)
-- exclude
-- default
-- index (not quite constraint, but still)
