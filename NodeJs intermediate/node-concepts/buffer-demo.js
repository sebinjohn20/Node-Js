const buffOne = Buffer.alloc(10);
console.log(buffOne);
const buffFromString = Buffer.from("Hello");
console.log(buffFromString);

const buffFromArrayOfIntegers = Buffer.from([1, 2, 3, 4, 5, 6, 0]);
console.log(buffFromArrayOfIntegers);
buffOne.write("node js");
console.log("After writing Node js to bufferOne", buffOne.toString());
console.log(buffFromString[0]);

///
