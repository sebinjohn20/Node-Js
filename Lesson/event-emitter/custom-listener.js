const EventEmitter = require("events");

class myCustomEmitter extends EventEmitter {
  constructor() {
    super();
    this.greeting = "Hello";
  }
  greet(name) {
    this.emit("greeting", `${this.greeting},${name}`);
  }
}
const myCustomEmitters = new myCustomEmitter();
myCustomEmitters.on("greeting", (input) => {
  console.log(`Greeting event `, input);
});
myCustomEmitters.greet("Sebin John");
