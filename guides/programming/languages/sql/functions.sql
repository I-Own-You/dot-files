-- functions support both named and positioin argument defining, but one at a time in std sql and both in postgres
CREATE FUNCTION concat_lower_or_upper(a text, b text, uppercase boolean DEFAULT false)
RETURNS text
AS
$$
 SELECT CASE
        WHEN $3 THEN UPPER($1 || ' ' || $2)
        ELSE LOWER($1 || ' ' || $2)
        END;
$$
LANGUAGE SQL IMMUTABLE STRICT;

-- positional notation:
SELECT concat_lower_or_upper('Hello', 'World', true); -- true can be ommited and it will be false as DEFAULT defined above
 concat_lower_or_upper
-----------------------
 HELLO WORLD
(1 row)

-- named notation:
SELECT concat_lower_or_upper(a => 'Hello', b => 'World'); -- position doesnt matter, either b=>'wordl', a=>'hello' would work
 concat_lower_or_upper
-----------------------
 hello world
(1 row)
;

-- mixed way only for psql:
SELECT concat_lower_or_upper('Hello', 'World', uppercase => true);
 concat_lower_or_upper
-----------------------
 HELLO WORLD
(1 row)
