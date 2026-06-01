myFirstBtn = document.getElementById("1-button");

myFirstBtn.style.color = "green"

myFirstBtn.addEventListener("click", function () {
  alert("Hello I am First button");
});

// removeEventListener is used to remove the event listener from the element
// myFirstBtn.removeEventListener("click", function () {
//   alert("Hello I am First button");
// });

myForm = document.querySelector("form");
usernameField = document.getElementById("username-field");
passwordField = document.getElementById("password-field");


myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  alert("Form submitted");

  console.log("Username: ", usernameField.value);
  console.log("Password: ", passwordField.value);

  sessionStorage.setItem("username", usernameField.value);
  sessionStorage.setItem("password", passwordField.value);

  console.log("Username from session storage: ", sessionStorage.getItem("username"));
  console.log("Password from session storage: ", sessionStorage.getItem("password"));

  sessionStorage.removeItem("username");
  sessionStorage.removeItem("password");

});

localStorage.setItem("username", "akhshy");
localStorage.setItem("password", "akhshy123");

console.log("Username from local storage: ", localStorage.getItem("username"));
console.log("Password from local storage: ", localStorage.getItem("password"));

localStorage.removeItem("username");
localStorage.removeItem("password");

document.cookie = "username=akhshy; expires=Fri, 31 Dec 2024 23:59:59 GMT";
document.cookie = "password=akhshy123; expires=Fri, 31 Dec 2024 23:59:59 GMT";

console.log("Cookies: ", document.cookie);

// To delete a cookie, we can set the expiry date to a past date
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

console.log("Cookies after deletion: ", document.cookie);



const arr = [1, 2, 3, 4, 5];

arr.push(6);
console.log(arr); // [1, 2, 3, 4, 5, 6]

arr.pop();
console.log(arr); // [1, 2, 3, 4, 5]

arr.unshift(0);
console.log(arr); // [0, 1, 2, 3, 4, 5]

arr.shift();
console.log(arr); // [1, 2, 3, 4, 5]

arr.shift();
console.log(arr); // [2, 3, 4, 5]

arr.forEach(function (element) {
  console.log(element);
});

const newArr = arr.map(function (element) {
  return element * 2;
});

console.log(newArr);

const newFilteredArr = arr.filter(function (element) {
  return element % 2 === 0;
});

console.log(newFilteredArr);

const sum = arr.reduce(function (accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);

console.log(sum);


const myObj = {
  name: "Akhshy",
  age: 25,
  city: "Delhi"
};

console.log(myObj['name']); // Akhshy
console.log(myObj.name); // Akhshy
console.log(myObj.age); // 25
console.log(myObj.city); // Delhi

myObj.country = "India";
console.log(myObj.country); // India

delete myObj.age;
console.log(myObj.age); // undefined

console.log(myObj); // { name: 'Akhshy', city: 'Delhi', country: 'India' }
console.log(Object.keys(myObj)); // [ 'name', 'city', 'country' ]
console.log(Object.values(myObj)); // [ 'Akhshy', 'Delhi', 'India' ]
console.log(Object.entries(myObj)); // [ [ 'name', 'Akhshy' ], [ 'city', 'Delhi' ], [ 'country', 'India' ] ]

