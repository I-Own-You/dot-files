import asyncio

# event loop:
# 1. everying in asyncio happens realtive to event loop,
#
# 2. it manages resources
#
# 3. it basically contains a collection of jobs to run
#     1. some jobs are directly added by the programmer
#     2. some jobs are added by asyncio
# 4. it takes jobs from its backlog of work and gives control to the job and then the job runs
# 5. once the job completes/pauses it returns control to the event loop and then it starts from step 4 again
# 6. the jobs are not 100% processed in order, mostly but not guaranteed
# 7. the process from step 4 is infinite, event loop looks again at jobs, run it, gets the control back and so on
# 8. if no jobs are available, it just rests and wastes no CPU resources, and up again to work when jobs added

# effective execution is when jobs share and cooperate, but if a job takes all resources, the event loop hogs,
# which makes it useless because one job basically paralized entire event loop

# this creates an event loop and indefinitely cycles through its collection of jobs.
event_loop = asyncio.new_event_loop()
event_loop.run_forever()


# async keyword transforms this function into an async functoin(coroutine function)
async def hello_printer():
    print("hello world")


# calling the async function will not execute it, instead, will create a coroutine object
hello_printer()  # <coroutine object hello_printer at 0x104ed2740>

# corotuine function(body)/objects(logic) are usually called jsut coroutine, but moslty it reffers to corotuine objects
# 1. a coroutine object is an instance of types.CoroutineType(its the native coroutine)
# 2. coroutines actually can exist as instances of collections.abc.Coroutine - another type for only checking
# 3. coroutine must be explicitly started, just creating it doesnt start it
# 4. coroutine can be paused/resumed at different points in time within the functions body, this represents *asynchronous code*
# 5. coroutine function/object were built by leveraging the functionality of generators/generator functoins

# tasks - coroutine objects tied to an event loop
# 1. it maintains a lis of callback functions(collection of jobs) through deriving Future class(there is happens)
# 2. you can craeate tasks in different ways but the recommended way is: asyncio.create_task()
# 3. creating a task automatically shedules it for execution
# 4. in each thread there is usually one event loop, asyncio by default associates a task with the event loop for you, so you
#    dont need to specify the event loop by yourself
coroutine = hello_printer()
# this creates a Task object and schedules its execution via the event loop.
task = asyncio.create_task(coroutine)


# actually, event loops arent created like we did at the start of the file:
# event_loop = asyncio.new_event_loop()
# event_loop.run_forever()
# the recommended way is asyncio.run() which takes care of the event loop and ensures the coroutine finishes before advancing
async def main():
    pass


if __name__ == "__main__":
    asyncio.run(main())
    # the program will not reach the following print statement until the
    # coroutine main() finishes.
    print("coroutine main() is done!")


# a task itself is not added to the event loop, only a callback to the task,
# its important if the task object is garbage collected before its called by the event loop
async def main2():
    # becaus the task doesnt have a reference, it could get garbage collected before the event loop executes it,
    asyncio.create_task(hello_printer())
    # aother code....


# 1. here, the event loop will find out the task doesnt even exist anymore.
# 2. it could also happen if corotuine completes before the task finishes(even if task has a reference)
asyncio.run(main2())


# await keyword
# "await some_task" or "await some_coroutine" have different behaviours
# 1. awaiting task: will give control form the current task or coroutine to the event loop
async def plant_a_tree():
    hello_printer_task = asyncio.create_task(hello_printer())
    # 1. here, a callback is added to the task list and event loop now works on it pausing the main coroutine, in our case its
    #    plant_a_tree() function and lines below "await hello_printer_task"
    # 2. when hello_printer_task finishes, the even loop gets a new callback(control back) which resumes the
    #    plant_a_tree() coroutine and resumes the code below "await hello_printer_task"
    await hello_printer_task
    # other code


# 2. awaiting coroutine: the difference from task is that it does not give control back to the event loop
async def coro_a():
    print("I am coro_a(). Hi!")


async def coro_b():
    print("I am coro_b(). I sure hope no one hogs the event loop...")


async def main3():
    # a task is scheduled inside evnet loop for execution
    task_b = asyncio.create_task(coro_b())
    num_repeats = 3
    for _ in range(num_repeats):
        # here, since its a coroutine and not a task, it doesnt give control to the outside coroutine when coro_a() finishes,
        # at least 1 time, so it will continue adding and only when all coro_a() finished it will give back control
        await coro_a()
    await task_b


asyncio.run(main3())
# I am coro_a(). Hi!
# I am coro_a(). Hi!
# I am coro_a(). Hi!
# I am coro_b(). I sure hope no one hogs the event loop...
#
# 3. the whole point is that awaiting a task means it executes one time and gives back control to the main coroutine,
#    even if its called in a loop N times
# 3.1. the coroutiine on the other hand, if placed in a loop, will execute N loop times and only when loop finishes,
#      will give control back to the main coorutine, but a single execution of a corotuine acts the same as a task.
# 4. so be aware with awaiting coroutines in a loop or many of them outside of loop, it could hog event loop.

# there is a more flexibile and powerful tool than Task, its Future class, it actually ipmlements a lot what,
# Task can, and Task actually derives Future class
