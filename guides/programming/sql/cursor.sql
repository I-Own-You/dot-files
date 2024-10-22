-- rather than executing a whole query at once,
-- it is possible to set up a cursor that encapsulates the query,
-- and then read the query result a few rows at a time.
-- one reason for doing this is to avoid memory overrun when the result contains a large number of rows.

-- however, PL/pgSQL users do not normally need to worry about that,
-- since FOR loops automatically use a cursor internally to avoid memory problems.

-- a more interesting usage is to return a reference to a cursor that a function has created,
-- allowing the caller to read the rows. This provides an efficient way to return large row sets from functions.

-- more info: https://www.postgresql.org/docs/current/plpgsql-cursors.html
