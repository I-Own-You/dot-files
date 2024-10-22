-- WITH provides a way to write auxiliary statements for use in a larger query.
-- these statements, which are often referred to as Common Table Expressions or CTEs,
-- can be thought of as defining temporary tables that exist just for one query.
-- each auxiliary statement in a WITH clause can be a SELECT, INSERT, UPDATE, or DELETE;
-- and the WITH clause itself is attached to a primary statement that can be a SELECT, INSERT, UPDATE, DELETE, or MERGE.

WITH regional_sales AS (
    SELECT region, SUM(amount) AS total_sales
    FROM orders
    GROUP BY region
), top_regions AS (
    SELECT region
    FROM regional_sales
    WHERE total_sales > (SELECT SUM(total_sales)/10 FROM regional_sales)
)
SELECT region,
       product,
       SUM(quantity) AS product_units,
       SUM(amount) AS product_sales
FROM orders
WHERE region IN (SELECT region FROM top_regions)
GROUP BY region, product;

-- more info https://www.postgresql.org/docs/current/queries-with.html
