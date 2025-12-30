const fs = require("fs");
const path = require("path");

const dataFolder = path.join(__dirname, "data");
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log("Data floder created");
}

const filePath = path.join(dataFolder, "example.txt");
fs.writeFileSync(filePath, "Hello from node js");
console.log("File created successfully");

const readContentFromFile = fs.readFileSync(filePath, "utf8");
console.log("File content:", readContentFromFile);

fs.appendFileSync(filePath, "\n This is a new line added to that file");
console.log("New file content added");

//asyn way of creating the file

const asynFilePath = path.join(dataFolder, "async-exampel.txt");
fs.writeFile(asynFilePath, "Hello Async node js", (err) => {
  if (err) throw err;
  console.log("Async file is created successfully");
  fs.readFile(asynFilePath, "utf8", (err, data) => {
    if (err) throw err;
    console.log("Async file content:", data);
    fs.appendFile(asynFilePath, "\n This is another line added", (err) => {
      if (err) throw err;
      console.log("New line added to Async:");
      fs.readFile(asynFilePath, "utf8", (err, updatedData) => {
        if (err) throw err;
        console.log("Asyn updated data", updatedData);
      });
    });
  });
});

///hkjkjhjkhjkhjkhjkhjkhkjhkjhjkhkhkkhjhjkhjkkhjhjkhjkhjkkjhkjhjhkjhkhjkhjkjhkhjkhjkhjhjkjkhjhkjhkhjkhjkhjkkjhhkjhkjhjkhjkhlkhkjhkjhkhkjkjjkjkjkkkkkkjhkkkkkkkkkhjhjkkjhkjjkhkjhjkjkjkjjkhhjkjkkjhkjhkjhkjkjkjjkjkjkhjkjkhjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk;klk;lk;l'k;'lk;'lkiouolkjlkjlkjlkjlkjlkjlkjl;kjlkjlkjlkklkjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjklkjkllllllllllllllllllllllllllllllllllllllljkjkjkljkljkljklkjljkljkljkljkljkljkljkjkljklkljjkjjklljkljkjkljkkjljkljkljkljkjkljkljkljkjkljkljkljjkjkllkjkljklkljkjkljkljkljkljkljkljjklljkjkljlkjlkjklljlkljkjkljkljkljkljkljkllkjjljkljkljkjklljkjlkljkljkljkjkjkljlkljkljkjklljkljkljkkkkkkkkkjkjkkjjkljklljkljkjklllljkljkljkljkljkjkllkjlkjkljkljkllklkjlkjlkkjljkljkjjjlkjlkjkljlkjkljkljljlkjkljlkjkljkljkljljkljkljkjjlkjkljkljklljkjkljkljkljlkjlkjkljkljkljkljkljkljkljklkjljklkjkjljklkjljkljkljlkjkljkljkljkljklljkjlkljkjlkjlkjkllkjjlkjlkjjkjkljkjjjjjjjjkljkjjjjjjkjjkjkljkjkljkjkjkljkljlkljkjkljkljjkjkljkjkljkljkljkljjjjkjkjkjkl;jlkjljjkljkljkjkjkjkjkjkjkjkjljjkljkljkljkljkjjjjkkkkkkkk
