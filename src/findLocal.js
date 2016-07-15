var fs = require("fs"),
    filePath = require("@nathanfaucett/file_path");


module.exports = findLocal;


function findLocal(id) {
    var root = process.cwd(),
        depth = root.split(filePath.separator).length,
        fullPath = filePath.join(root, id);

    if (fs.existsSync(fullPath)) {
        return fullPath;
    } else {
        while (depth--) {
            fullPath = filePath.join(root, id);
            root = filePath.join(root, "..");

            if (fs.existsSync(fullPath)) {
                return fullPath;
            }
        }
        throw new Error("could not find " + id);
    }
}
