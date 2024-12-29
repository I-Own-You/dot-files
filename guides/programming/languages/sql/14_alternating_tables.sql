ALTER TABLE mytable
ADD column DataType OptionalTableConstraint  -- adding columns
    DEFAULT default_value;

ALTER TABLE mytable
DROP column_to_be_deleted; -- remove column

ALTER TABLE mytable
RENAME TO new_table_name; -- renamte table
