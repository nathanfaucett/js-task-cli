var colors = require("colors"),
    findLocal = require("./findLocal"),
    findLocalModule = require("./findLocalModule"),
    getRandomColorFn = require("./getRandomColorFn");


var task = module.exports = require(findLocalModule("@nathanfaucett/task")),
    args = process.argv.slice(2),
    command = args[0] || "default";


require(findLocal("taskfile.js"));


if (command === "--help") {
    console.log("\n\rtask help:\n\r\n\r" + task.help(args[1]));
} else {

    task.on("Task.start", function onStart(task) {
        task.colorFn = getRandomColorFn();
        console.log(task.colorFn("[ Started  ]"), colors.grey("- " + task.name));
    });
    task.on("Task.end", function onStart(task) {
        console.log(
            task.colorFn("[ Finished ]"), colors.grey("- " + task.name), colors.grey((task.endTime - task.startTime) + "ms")
        );
    });

    task.run(command, function onDone(error) {
        if (error) {
            throw error;
        }
    });
}
