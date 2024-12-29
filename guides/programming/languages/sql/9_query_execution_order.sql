SELECT DISTINCT column, AGG_FUNC(column_or_expression), …
FROM mytable
    JOIN another_table
      ON mytable.column = another_table.column
    WHERE constraint_expression
    GROUP BY column
    HAVING constraint_expression
    ORDER BY column ASC/DESC
    LIMIT count OFFSET COUNT;

1. -- FROM and subsequent JOIN queries are executed first to determine the amount of data that is queried.
   -- under the hood, sometimes it creates another tables to store data or something else
2. -- WHERE clause is executed second, its applied to all rows and select the ones satisfying the condition
3. -- GROUP BY is executed third for grouping the rows by common values, so it should be used only with aggregate functions
4. -- HAVING is executed fourth, is applied on GROUP BY if its there
5. -- SELECT is executed fifth
6. -- DISTINCT is executed sixth, it discard the computed SELECT query that are duplicates
7. -- ORDER BY is executed seventh, now as SELECT is computed, it can order the rows
8. -- LIMIT AND OFFSET are the last executed, limiting the returned rows and its starting point
