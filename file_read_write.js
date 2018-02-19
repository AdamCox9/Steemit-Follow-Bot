'use strict';


//http://stackabuse.com/reading-and-writing-json-files-with-node-js/


const fs = require('fs');

let rawdata = fs.readFileSync('student.json');  
let student = JSON.parse(rawdata);  
console.log(student);  



fs.readFile('student.json', (err, data) => {  
    if (err) throw err;
    let student = JSON.parse(data);
    console.log(student);
});

console.log('This is after the read call');  

let student = {  
    name: 'Mike',
    age: 23, 
    gender: 'Male',
    department: 'English',
    car: 'Honda' 
};

let data = JSON.stringify(student);  
fs.writeFileSync('student-2.json', data);  



let jsonData = require('./student.json');

console.log(jsonData);  






let student = {  
    name: 'Mike',
    age: 23, 
    gender: 'Male',
    department: 'English',
    car: 'Honda' 
};

let data = JSON.stringify(student, null, 2);

fs.writeFile('student-3.json', data, (err) => {  
    if (err) throw err;
    console.log('Data written to file');
});

console.log('This is after the write call');  