const express = require('express');
// ファーストパーティークッキー
const app1 = express()
const cookie1 = (req,res,next) =>{
    res.cookie("first-cookie","hoge.com",{
        httpOnly: true,
    });
    next();
};
app1.use(cookie1)
app1.use(express.static('statics'))
app1.listen(8080,() => console.log('Listening on port 8000...http://localhost:8080/index.html'))


// サードパーティークッキー
const app2 = express()
const options = {
  setHeaders: function (res) {
    res.cookie('third-cookie', 'huga.com', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    })
  }
}
app2.use(express.static('statics', options))
app2.listen(8081,() => console.log('Listening on port 80...http://localhost:8081/index.html '))
