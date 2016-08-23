var colors = require("colors"),
    findLocal = require("./findLocal"),
    findLocalModule = require("./findLocalModule");


var task = module.exports = require(findLocalModule("@nathanfaucett/task")),
    args = process.argv.slice(2),
    command = args[0] || "default";


require(findLocal("taskfile.js"));


function forceSize(value, size) {
    var string = '' + value;

    size = size || 2;

    while (string.length < size) {
        string = '0' + string;
    }

    return string;
}

function formatDate(date) {
    return (
        forceSize(date.getHours()) + ':' +
        forceSize(date.getMinutes()) + ':' +
        forceSize(date.getSeconds()) + '.' +
        forceSize(date.getMilliseconds(), 3)
    );
}

if (command === "--help") {
    console.log("\n\rtask help:\n\r\n\r" + task.help(args[1]));
} else {

    task.on("Task.start", function onStart(task) {
        console.log(
            "[" + colors.grey(formatDate(new Date(task.startTime))) + "]",
            "Starting \"" + colors.cyan(task.name) + "\" ..."
        );
    });
    task.on("Task.end", function onStart(task) {
        console.log(
            "[" + colors.grey(formatDate(new Date(task.endTime))) + "]",
            "Finished " + colors.cyan(task.name),
            "after " + colors.magenta(((task.endTime - task.startTime) | 0) + " ms")
        );
    });

    task.run(command, function onDone(error) {
        if (error) {
            throw error;
        }
    });
}
