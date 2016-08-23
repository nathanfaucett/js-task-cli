var task = require("@nathanfaucett/task");


function createTask(name) {
    function simple(done) {
        setTimeout(done, Math.random() * 100);
    }
    simple.displayName = name;
    return simple;
}


task("series", "runs a series of tasks", task.series(
    createTask("series0"),
    createTask("series1")
));

task("parallel", "runs tasks in parallel", task.parallel(
    createTask("parallel0"),
    createTask("parallel1")
));

task("complex", "runs some very complex tasks", task.parallel(
    createTask("simple"),
    task("series"),
    task("parallel")
));

task("default", task("complex"));

task(function watch() {
    task.watch([
        "./taskfile.js"
    ], task("default"));
});
