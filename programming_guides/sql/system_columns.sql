-- not much info about
-- https://www.postgresql.org/docs/current/ddl-system-columns.html
-- every table has several system columns that are implicitly defined by the system. Therefore, these names cannot be used as names of user-defined columns. (Note that these restrictions are separate from whether the name is a key word or not; quoting a name will not allow you to escape these restrictions.) You do not really need to be concerned about these columns; just know they exist.

-- tableoid 
-- the OID of the table containing this row. This column is particularly handy for queries that select from partitioned tables (see Section 5.11) or inheritance hierarchies (see Section 5.10), since without it, it's difficult to tell which individual table a row came from. The tableoid can be joined against the oid column of pg_class to obtain the table name.

-- xmin 
-- the identity (transaction ID) of the inserting transaction for this row version. (A row version is an individual state of a row; each update of a row creates a new row version for the same logical row.)

-- cmin 
-- the command identifier (starting at zero) within the inserting transaction.

-- xmax 
-- the identity (transaction ID) of the deleting transaction, or zero for an undeleted row version. It is possible for this column to be nonzero in a visible row version. That usually indicates that the deleting transaction hasn't committed yet, or that an attempted deletion was rolled back.

-- cmax 
-- the command identifier within the deleting transaction, or zero.

-- ctid 
-- the physical location of the row version within its table. Note that although the ctid can be used to locate the row version very quickly, a row's ctid will change if it is updated or moved by VACUUM FULL. Therefore ctid is useless as a long-term row identifier. A primary key should be used to identify logical rows.
