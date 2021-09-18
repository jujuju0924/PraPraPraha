# CORSについて理解する

# 課題1（質問）

### CORの仕組みを説明

CORS(cross-origin-resource-sharing)の事で同一生成元ポリシー（same-origin-policy)によって設けられた制限を緩めるもの。

簡単に説明するとJavaScriptで自由にやりとりできる部分はJavaScriptをとってきたところと同一の場所だけに制限する事

同一生成元かどうか判断する時には、ホスト名、スキーム、ポート番号がチェックされる。

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3dfabeb8-3ccb-4cae-9fb6-7dcdaa6c6315/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3dfabeb8-3ccb-4cae-9fb6-7dcdaa6c6315/Untitled.png)

これらが同じ場合、同一生成元へのアクセスとみなされる。この制限のおかげであるサーバーからJavaScriptをダウンロードし、そのスクリプトから全く別のサーバーにアクセスして情報を取得することができなくなる。

つまりセキュリティが高くなる。

ただ、ある企業AがREST方式のウェブサービスを一般公開しているとして、企業Aは誰でもどこからでもウェブサービスを使ってもらいたいと考えていたとする。

ただ、同一生成元ポリシー(same-origin-policy)では難しい。そこでCORSが登場した。CORSは同一生成元ではなくてもJavaScriptによる自由なアクセスが許可される

同一生成元は英語でsame-originといい、同一ではない場合をcross-originという

### preflight requestが送信されない「シンプルなリクエスト」に該当するための条件説明

CORSにはSimple RequestとPreflight Requestがあり

Simple RequestにはHTTPのメソッドとしてGET,POST,HEADを使い、Accept、Accept-Language、以下のContent-Typeの基本的なHTTPヘッダがセットされるだけのリクエストであればSimple Requestと呼べる

Content-Type

- `application/x-www-form-urlencoded`
- `multipart/form-data`
- `text/plain`

### Access-Control-Allow-Originヘッダーに、リクエスト送信元のオリジンが含まれない場合の説明

サーバーがHTTP要求を許可する場合はAccess-Control-Allow-OriginのHTTPヘッダーをセットして応答を返却する

サーバーから適切な許可がなければブラウザはエラーとなる

どのオリジンからもアクセスすることができるため、

[https://dev.opera.com/articles/dom-access-control-using-cors/](https://dev.opera.com/articles/dom-access-control-using-cors/)

### XMLHttpRequestを使ってクロスオリジンリクエストの説明

XMLHttpRequestを使ってクロスオリジンリクエストを発行する際、デフォルトの挙動だとリクエストにクッキーが含まれない。OriginをまたいだXMLHttpRequestでCookieを送りたい場合はクライアントサイドとサーバーサイドに記述をする必要がある

### Client Side

XML

const xhr = new XMLHttpRequest();
xhr.withCredentials = true; 

### Server Side

Node.jsでcors module

import cors from 'cors';

const app = express();
app.use(cors({ origin: true, credentials: true }));

### Access-Control-Allow-Origin: *の説明

Access-Control-Allow-Origin はクレデンシャルを持つリクエストに対してアスタリスク * を使うことは禁止されてる。

# 課題2（クイズ）

クイズ

1. プレフライトリクエストのレスポンスで、リソースにアクセスするときに使用して良いメソッドを指定するCORSのヘッダーは何か

Access to XMLHttpRequest at '[http://localhost:3065/user](http://localhost:3065/user)' from origin '[http://localhost:3000](http://localhost:3000/)' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

2.上記のエラーが出ました。リクエストとレスポンスがうまくいっていないようです。エラー文を読んで何が原因でエラーが出ているか述べよ。

https://www.hogehoge.com:443/search?piyopiyo=papa

   3.上記のoriginはどれか。

# 課題3（実装を確認お願いします）

# 課題4（成果物に関する質問）

CORS制約はブラウザ上でのみ有効なため、適用はされない。