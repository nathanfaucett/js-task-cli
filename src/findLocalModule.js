var filePath = require("@nathanfaucett/file_path"),
    findLocal = require("./findLocal");


module.exports = findLocalModule;


function findLocalModule(name) {
    return filePath.dirname(findLocal(filePath.join("node_modules", name, "package.json"), "node module", name));
}
