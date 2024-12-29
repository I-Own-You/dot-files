SELECT particle_speed / 2.0 AS half_particle_speed -- the as part is not expression, the particle_speed / 2.0 is
FROM physics_data
WHERE ABS(particle_position) * 10.0 > 500;

SELECT col_expression AS expr_description, …
FROM mytable;

SELECT column AS better_column_name, …
FROM a_long_widgets_table_name AS mywidgets
INNER JOIN widget_sales
  ON mywidgets.id = widget_sales.widget_id;


-- you can also write SELECT column another_column_name instead of SELECT column as another_column_name
