console.log('Hello World!');
console.error('This is an error message.');
console.warn('This is a warning message.');
console.table({ name: 'Alice', age: 30, city: 'New York' });
console.time('Timer');

// This line will not be running

var x = 1; // number
const y = 'Hello'; // string
var z = true; // boolean
var c = { name: 'Alice', age: 30 }; // object
var d = ['alice', true, ['x', false, 0], 'akhshy', 'js', 'mern']; // array
//   0        1     2                 3         4     5

console.log(x) // 1
x = 2
console.log(x) // 2

console.log(y) // Hello
y = 'World' // Error: Assignment to constant variable.


console.log(d[3]) // akhshy

console.log(c.name) // Alice

// variable types = var / const / let

//hoisting
