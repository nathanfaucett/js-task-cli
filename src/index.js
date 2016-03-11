var findLocal = require("./findLocal"),
    findLocalModule = require("./findLocalModule");


var task = module.exports = require(findLocalModule("task")),
    args = process.argv.slice(2),
    command = args[0] || "default";


require(findLocal("taskfile.js"));


if (command === "--help") {
    console.log("\n\rtask help:\n\r\n\r" + task.help(args[1]));
} else {
    task.run(command, function onDone(error) {
        if (error) {
            throw error;
        }
    });
}
