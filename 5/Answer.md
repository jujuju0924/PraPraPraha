### サードパーティクッキーについて理解する

### **課題１（質問）**

### 質問1

両者の違いはシンプルでCookieの発行元がどこのドメインかで分類することができる

例えばユーザーがwww.example.co.jpに訪れたとして、このサイトにはログインが必要なメニューがあり、一度ログインすると次回から情報入力の手間を減らすようにCookie-Aが付与される。

このサイトにはバナー広告が表示されていて、バナー広告はアドサーバーwww.adserver.co.jpから配信されており、そのバナー経由でユーザーにCookie-Bが付与されるとする。

この場合にユーザーが実際に訪れているドメインから発行されているCookie-A(www.example.co.jp)をファーストパーティークッキー、それ以外のドメインから発行されているCookie-B(www.adserver.co.jp)をサードパーティCookieと呼ぶ

出典

[https://note.dimage.co.jp/blog_001_firstparty-cookie-thirdpirty-cookie.html](https://note.dimage.co.jp/blog_001_firstparty-cookie-thirdpirty-cookie.html)

[https://media.kaizenplatform.com/n/n13f0904db164](https://media.kaizenplatform.com/n/n13f0904db164)

### 質問2

- AdSenseの場合はCookieを使用して広告セッションを個々のユーザーおよび端末と関連付ける。ほとんどのCookieにはCookieIdと呼ばれる固有の識別子が含まれている。ウェブサイトやサーバーによって、Cookieが保存されるブラウザに関連づけられた文字列。仕組みとしては広告が表示、またはクリックされた場合や、AdSenseサーバーの呼び出しに繋がるアクションがあったときに、ユーザーのブラウザにCookieが送信される。ブラウザがCookieを受け入れた場合、Cookieがブラウザに保存される。

出典

[https://support.google.com/adsense/answer/6373251?hl=ja](https://support.google.com/adsense/answer/6373251?hl=ja)

[https://support.google.com/adsense/answer/7549925](https://support.google.com/adsense/answer/7549925)

### 質問3

- スクリプト、画像、フォント、CSSファイル
- javasciprtのスクリプトタグに例えば、example.comというサイトがあり、そのサイトにアクセスした際にスクリプトタグに

<script src = "[https://someservice.com/js/livechat.js](https://someservice.com/js/livechat.js)"> </ script>

という記述があったとする。example.comにアクセスした際にスクリプトタグも読みこまれるため、ブラウザにはアクセスしたことのないランダムなWEBサイトのサードパーティーCookieが既に保存されている。

つまり、画像、フォント、CSSファイルに同じようにリンクを貼ることによってサードパーティーを設定できる

出典：

[https://cookie-script.com/all-you-need-to-know-about-third-party-cookies.html](https://cookie-script.com/all-you-need-to-know-about-third-party-cookies.html)

[https://qiita.com/bobunderson/items/1874d837de5c2a4c5d0c](https://qiita.com/bobunderson/items/1874d837de5c2a4c5d0c)

### 質問4

- safariはデフォルトでサードパーティークッキーをブロック
- GoogleCromeは2022年までにサードパーティクッキーをサポートしない予定
- Firefoxは初めてFirefoxを使うユーザーの場合にコンテンツブロッキングの設定がデフォルト（初期設定）でカスタムになっている。
- Microsoft Edgeはデフォルトでアクセスしていないサイトからのcookieはブロック。許可もできる
- Internet Explorerはいろんな意味で終了

### 質問5

- 同一ドメインの場合はファーストパーティークッキー