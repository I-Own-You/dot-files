-- RETURNING clause can avoid performing SELECT clause to take back data from modified rows with INSERT, UPDATE, DELETE
-- RETURNING works like SELECT, so you can use everything on RETURNING as you used on SELECT

-- for INSERT, RETURNING will return added data as row/rows
CREATE TABLE users (firstname text, lastname text, id serial primary key);
INSERT INTO users (firstname, lastname) VALUES ('Joe', 'Cool') RETURNING id; -- here we return only the id column

-- for UPDATE, RETURNING will return updated data from modified row/rows
UPDATE products SET price = price * 1.10
WHERE price <= 99.99
RETURNING name, price AS new_price; -- same as SELECT clause has it, RETURNING has it too

-- for DELETE, RETURNING will return the deleted data from row/rows
DELETE FROM products
WHERE obsoletion_date = 'today'
RETURNING *; -- same as SELECT * (everyting will be returned, in this case the deleted data row/rows)
