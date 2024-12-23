-- trigger is a db engine functionality which lets you run some code based on some triggers

-- trigger example
create function update_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger set_updated_at
before update on users
for each row
execute function update_updated_at();

-- trigger associated with tables are still valid even if tables gets renamed,
-- it updates internally so it will still be valid.
-- trigger can be associated only with 1 table, you cannot do things like: before update on table1, table2...
