-- valid numeric constants:
42
3.5
4.
.001
5e2
1.925e-3

-- -, + wont make the number negative, its an operator that needs 2 numbers for an operation, its not javascript kid
-- hexadecimal, oct, bin integer numbers are also allowed
0b100101
0B10011001
0o273
0O755
0x42f
0XFFFF

-- you can also visually group them with _
1_500_000_000
0b10001000_00000000
0o_1_755
0xFFFF_FFFF
1.618_034

-- numbers are always given a type and sometimes can be coerced(casted to another types):
-- where they fit, the type is given: integer, bigint, numeric
-- casting is done with:
    -- TYPE 'number' => REAL '1.23', works only for simple literal constants, doesnt work for arrays, but postgres allows for all types
    -- 1.23::REAL (postgres way, historical reasons)
    -- CAST ('string' as type), a standard way of sql
