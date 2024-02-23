-- to constant strings separated by whitespace and at least one new line, are concatenated
SELECT 'foo'
'bar';
-- is equivalent to:
SELECT 'foobar';

SELECT 'foo'      'bar'; -- error, no new line

-- to add a single quote in a single quote string, concatenate them, meaning add 2 ' quotes 
'Dianne''s horse' -- will result in 'Dianne's horse'

-- escape characters in standart sql is to use E in front of ''
-- but postgresql supports by default as an extension the backslash syntax: \b, \t, \n, \r and .etc, it must be inside string


-- dolar quotes strings:
$$Dianne's horse$$
$SomeTag$Dianne's horse$SomeTag$
-- anything between $$ $$ is treated as literal string, no special characters will work, nor backslash eithter
-- you can also use tags between the first opening andd last $tag_name$ $tag_name$, they must be the same

-- bit strings:
B'1010' -- only 0 or 1 allowed in it, you can also use hexadecimal with x'1FF'
