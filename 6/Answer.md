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

### preflight request

すごく簡単に表現すると、プリフライトは「本当にリクエスト送って良いの？」を確かめるためのブラウザのセキュリティ機構。

`OPTIONS` メソッドで対象の異なるオリジンにリクエストを送り、実際のリクエストを送っても問題ないか確認する。該当するリクエストは以下。

- PUT
- DELETE
- CONNECT
- OPTIONS
- TRACE
- PATCH

プリフライトリクエストのレスポンスとして、アクセスを許可するメソッドをレスポンスヘッダーに含める必要がある。

`Access-Control-Allow-Methods: PUT, DELETE, PATCH`

### simple request

MDN抜粋

・許可されているメソッドのうちの一つであること。
　・GET
　・HEAD
　・POST
・ユーザーエージェントによって自動的に設定されたヘッダー (たとえば Connection、 User-Agent、 または Fetch 仕様書で「禁止ヘッダー名」として定義されているヘッダー) を除いて、手動で設定できるヘッダーは、 Fetch 仕様書で「CORS セーフリストリクエストヘッダー」として定義されている以下のヘッダーだけです。
　・Accept
　・Accept-Language
　・Content-Language
　・Content-Type (但し、下記の要件を満たすもの)
　　　・application/x-www-form-urlencoded
　　　・multipart/form-data
　　　・text/plain
　・DPR
　・Downlink
　・Save-Data
　・Viewport-Width
　・Width
・リクエストに使用されるどの XMLHttpRequestUpload にもイベントリスナーが登録されていないこと。これらは正しく XMLHttpRequest.upload を使用してアクセスされます。
・リクエストに ReadableStream オブジェクトが使用されていないこと。

### access-control-allow-origin

別のオリジン下のコンテンツから、自身のサーバーのリソースが読み取りアクセスされることを許可するヘッダ

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