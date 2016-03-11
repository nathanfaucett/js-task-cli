var task = require("..");


function createTask(name) {
    function simple(done) {
        done();
    }
    simple.displayName = name;
    return simple;
}


task("series", task.series(
    createTask("series0"),
    createTask("series1")
));

task("parallel", task.parallel(
    createTask("parallel0"),
    createTask("parallel1")
));

task("complex", task.parallel(
    createTask("simple"),
    task("series"),
    task("parallel")
));
