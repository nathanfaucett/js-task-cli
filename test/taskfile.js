var Stream = require("stream"),
    task = require("@nathanfaucett/task");


function createTask(name) {
    function simple(done) {
        setTimeout(done, Math.random() * 100);
    }
    simple.displayName = name;
    return simple;
}

function createStreamTask(name) {
    var readable = new Stream.Readable(),
        writable = new Stream.Writable();

    readable._read = function() {};
    writable.writable = true;
    writable.write = function() {};

    function simple() {
        setTimeout(function onNextTick() {
            readable.emit("data", "");
            readable.emit("end");
        }, Math.random() * 100);
        return readable.pipe(writable);
    }
    simple.displayName = name;

    return simple;
}


task("series", "runs a series of tasks", task.series(
    createTask("series0"),
    createStreamTask("series1")
));

task("parallel", "runs tasks in parallel", task.parallel(
    createStreamTask("parallel0"),
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
