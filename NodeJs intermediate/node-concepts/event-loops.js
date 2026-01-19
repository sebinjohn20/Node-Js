const fs = require("fs");
const crypto = require("crypto");
console.log("1 . script start");

setTimeout(() => {
  console.log("2. settimeout 0s callback(macro task");
}, 0);
setTimeout(() => {
  console.log("3. settimeout 0s callback(macro task");
}, 0);

setImmediate(() => {
  console.log("4. setImmediate callback(check)");
});
Promise.resolve().then(() => {
  console.log("5, Promise reslved (microtask)");
});

process.nextTick(() => {
  console.log("6 process.nexttick callback");
});
fs.readFile(__filename, () => {
  console.log("7. file read operation (I/o callback)");
});
crypto.pbkdf2("secret", "salt", 1000, 64, "sha512", (err, key) => {
  if (err) throw err;
  console.log("8 pbkdg2 operation completed (CPU intensive task");
});
console.log("9 script ends");

//dfdsfdsfdsfdfdfdfdsfdfdfd
