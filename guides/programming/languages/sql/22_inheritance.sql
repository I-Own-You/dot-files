-- more https://www.postgresql.org/docs/current/ddl-inherit.html
CREATE TABLE capitals (
  name       text,
  population real,
  elevation  int,    -- (in ft)
  state      char(2)
);

CREATE TABLE non_capitals (
  name       text,
  population real,
  elevation  int     -- (in ft)
);

CREATE VIEW cities AS
  SELECT name, population, elevation FROM capitals
    UNION
  SELECT name, population, elevation FROM non_capitals;

-- can be written more effectively into this
CREATE TABLE cities (
  name       text,
  population real,
  elevation  int     -- (in ft)
);

CREATE TABLE capitals (
  state      char(2) UNIQUE NOT NULL
) INHERITS (cities); -- here is the line

SELECT name, elevation
    FROM ONLY cities
    WHERE elevation > 500;
-- ONLY means select only runs over cities table and not tables that are related to it(foreign keys), many clauses supports it
