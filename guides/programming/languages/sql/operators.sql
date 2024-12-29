-- available operators:
+ - * / < > = ~ ! @ # % ^ & | ` ?

-- adjacent operators in some keys must be separaated by whitespace
-- for example @- is allowed operatorn name, but *-, *@ not, be cautious

-- operator precedence
operator:                           associativity:            description:
    .	                                left	                table/column name separator
    ::	                                left	                PostgreSQL-style typecast
    [ ]	                                left	                array element selection
    + -	                                right	                unary plus, unary minus
    COLLATE	                            left	                collation selection
    AT	                                left	                AT TIME ZONE
    ^	                                left	                exponentiation
    * / %	                            left	                multiplication, division, modulo
    + -	                                left	                addition, subtraction
    (any other operator)	            left	                all other native and user-defined operators
    BETWEEN IN LIKE ILIKE SIMILAR	                 	        range containment, set membership, string matching
    < > = <= >= <>	 	                                        comparison operators
    IS ISNULL NOTNULL	 	                                    IS TRUE, IS FALSE, IS NULL, IS DISTINCT FROM, etc.
    NOT	                                right	                logical negation
    AND	                                left	                logical conjunction
    OR	                                left	                logical disjunction
