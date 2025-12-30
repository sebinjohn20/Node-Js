const firstmodule = require("./first-module");
console.log(firstmodule.add(10, 20));

try {
  console.log("trying to divide by zero");
  let result = firstmodule.divide(10, 2);
  console.log(result);
} catch (error) {
  console.log("Caught an error", error.message);
}

// Module Wrapper

(function (exports, require, module, __filename, __dirname) {
  /// your module
});
