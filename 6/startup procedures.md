## 手順

- requestフォルダに移動し
- npm install
- node requestServer.jsコマンドで port 3001が起動

- reponseフォルダに移動し
- npm install
- npm install express connect-multiparty
- npm install ngrok express
- node responseServer.jsコマンドで port 8080とngrok起動
- ngrokが起動したら6/request/public_html/cors.jsのxhr.openのpostメソッドにURLを貼り付ける

- URLに[http://localhost:3001/cors.html](http://localhost:3001/cors.html)を貼り付けてOKボタンを
- 押すとレスポンスサーバーにPOSTされる
