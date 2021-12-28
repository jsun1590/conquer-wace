const fs = require("fs");

var file = "src/data/users.json";
if(!fs.existsSync(file)) {
    fs.writeFileSync("src/data/users.json", "[]");
}

var content = JSON.parse(fs.readFileSync(file, 'utf-8'));
console.log(content)
var user = content.find((user: { userId: string; }) => user.userId === "238");

if (user == "undefined") {

}


// print
// let test = [];
// let data = JSON.stringify(test, null, 2);
// fs.writeFileSync("src/data/users.json", data);