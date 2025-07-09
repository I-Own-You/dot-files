if (Math.random() > 0.5) {
    console.log(true, 1)
} else {
    console.log(false, 2)
}

// if clause allow you one line of code without { }, but if you have more
// than 1 line, you must put { }
if (Math.random() > 0.5) console.log(true)

// same, without { }
if (Math.random() > 0.5) console.log(true, 1)
else if (Math.random() > 0.7) console.log(true, 2)
else console.log(true, 3)

// if conditoin is always converted to boolean
