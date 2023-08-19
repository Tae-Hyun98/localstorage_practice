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

const arr = [1, 2, 3, 4];
console.log(arr[0])