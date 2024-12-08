-- transaction bundles multiple steps into one operation, so it must execute all steps or not at all
-- if transaction occured, it is permanently recorded by the db in a storage (disk) before it will be considered completed, during the transaction, other transactions dont see the state of other transactions, only when its executed they will start to see the changes
-- all sql statements actually are wrapped into a transaction by default
-- a transaction is also atomic

BEGIN; -- this means start of a transaction
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
-- etc etc
COMMIT; -- end of a transaction

-- if we noticed something bad happened we can rollback all the changes by the transaction with ROLLBACK instead of COMMIT, it must occur before COMMIT
-- we also can define SAVEPOINT somewhere during transaction, and return to the state before this SAVEPOINT with ROLLBACK TO savepoint_name if we needed to discard some changes
BEGIN;
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
SAVEPOINT my_savepoint;
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Bob';
-- oops ... forget that and use Wally's account
ROLLBACK TO my_savepoint; -- if we omit the savepoint, we rollback the whole transaction 
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Wally';
COMMIT;
