-- generated column is always computed from other columns or with DEFAULT value
-- generated columns are of 2 types: virtual and stored
-- stored means its actually created and stored on the disk as other columns
-- virtual means temporarelly created for some tasks
-- psql currently implements only STORED, not virtual
-- you cannot directly write to a generated column, it is updated only when INSERT or UPDATE happens on a row
-- more details on restrictions and rules: https://www.postgresql.org/docs/current/ddl-generated-columns.html

CREATE TABLE people (
    ...,
    height_cm numeric,
    height_in numeric GENERATED ALWAYS AS (height_cm / 2.54) STORED -- STORED means it will be stored
);
