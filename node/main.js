/* const http = require('http');
const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('여기는 루트입니다.');
  } else if (req.url === '/login') {
    res.end('여기는 로그인입니다.');
  }
});

app.listen(3001, () => {
  console.log('http로 가동된 서버');
}) */


/* const express = require('express');
const app = express();

app.get('/', (req, res) => {
  //기능
  res.send('여기는 루트입니다.')
  window.open('/index.html')
})

app.get('/login', (req, res) => {
  //기능
  res.send('여기는 로그인입니다.')
})
app.listen(4000, function () {
  console.log('서버 가동');
  console.log('서버 준비완료');
  console.log('서버 준비완료');
}); */

const arr = [{
    title: '테스트',
    age: 20,
    abc: '123'
  },
  {
    title: '테스트2',
    age: 30,
    abc: '1234'
  }
];
let object = [];
object.push(arr)

console.log('arr = ', arr) //객체배열
console.log('stringify arr = ', JSON.stringify(arr))
console.log('object push = ', ...object)

const person = {
  name: ["Bob", "Smith"],
  age: 32,
  gender: "male",
  interests: ["music", "skiing"],
  bio: function () {
    alert(
      this.name[0] +
      " " +
      this.name[1] +
      " is " +
      this.age +
      " years old. He likes " +
      this.interests[0] +
      " and " +
      this.interests[1] +
      ".",
    );
  },
  greeting: function () {
    const div = document.querySelector('.div1');
    const p = document.createElement('p');
    div.appendChild(p);

    p.innerHTML = "Hi! I'm " + this.name[0] + ".";
  },
};
console.log(person.name)
person.greeting();