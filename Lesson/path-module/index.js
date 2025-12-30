const path = require("path");
console.log("Directory name:", path.dirname(__filename));
console.log("file name", path.basename(__filename));
console.log("file Extension", path.extname(__filename));
const joinPath = path.join("/user", "documents", "node", "projects");
console.log("Joined path", joinPath);
const resolvePath = path.resolve("user", "documents", "node", "projects");
console.log("Reslove Path", resolvePath);

const normalizePath = path.normalize("/user/.documents/../node/projects");
console.log("Normalize Path", normalizePath);
