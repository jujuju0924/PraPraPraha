### Host

- リクエストヘッダーはリクエストが送信される先のサーバーのホスト名とポート番号を指定
- 例えばlocalhost:3000は仮想のマシーンのipアドレス127.0.01というアドレスのホスト名として名前が割り当てられている
- ブラウザからサーバーに対して、サーバ名を送信する
- 例：hoge.example.com ホスト名(hoge)とドメイン名(example.com)でサーバを表す

### Content-type

- Content-Type エンティティヘッダーは、リソースのメディア種別を示すために使用する
- 簡単にいうとファイルの種類を表す情報が書いてある項目
- メールやホームページのファイルにくっつけて送られる
- 例：Content-Type: text/html;（ファイル形式） charset=UTF-8（文字コード）
- よく使うのはtext/htmlとapplication/json
- Content-Type: multipart/form-data;（POSTによるhttp Requestでフォームデータを送信する) boundary=something (somethingにはアップロードしようとするファイルデータが入る）

```
<!--multipart/form-data形式でPOSTする例-->

<form method="POST" action="/upload" enctype="multipart/form-data">
    <input type="text" name="message" value="Hello"/><br>
    <input type="file" name="file"/><br>
    <input type="submit" value="SUBMIT"/>
</form>
```

### User-agent

- ブラウザがWebサーバーにデータをとりに行く際にサーバーに対して自動的に通知している。ブラウザの種類やバージョンやOSの種類、バージョンの除法を組み合わせた識別子
- 例:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36
- 自分のmacでGoogleChrome上だと上記のようになる。
- 例:Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F70 Safari/600.1.4
- 上記はiphoneの一例
- サーバーに自動送信される内容のため、htaccessで判別などに利用可能となる

### Accept

- まずAcceptとContent-Typeの違い
- Acceptはクライアント側（ブラウザ側がどんなデータを処理できるかを表す）
- Content-Typeは実際にどんな形式のデータを送信したかを表す
- 例:accept: * / *
- 上記は全てのファイルを受け取れる

### Referer

- Refererとはユーザーが自分のWEBサイトへ来た際に、そのユーザーがWEBサイトへ来た元（参照元）になったページの情報のことをいう。例えば、ユーザーがWebサイトAにあるリンクをクリックしてサイトBへ移動してきた場合、サイトBのリファラーはサイトAのものとなる。
- Refererの分析はSEOやSEMに関する対策に必須であるだけでなく、利用されている検索キーワードからユーザーがWebサイトに期待している要素を知ることができる。

### Accept-Encoding

- サーバーとの通信データ量を減らしたい場合はコンテンツ内容を変えずにデータを圧縮したほうが良い。テキストはバイナリなどに比べると圧縮しやすく、HTML,CSS,JavaScript,JSON,XMLなどのテキストに圧縮すれば通信データ量を減らすことができる
- Accept-Encodingはクライアントがサーバーにリクエスト送信する際に圧縮方式をサーバーに教えることで、サーバーがAccept-Encodingヘッダの値を見て、クライアントに合う圧縮アルゴリズムでコンテンツを圧縮して返却してくれる。

### Authorization

- Basic認証を使用している場合にAuthorizationを次のように書式設定する
- Authorization: Basic email_address:password
- メールアドレスとパスワードを組み合わせて承認ヘッダーを生成する。
- 入力したユーザー名あるいはパスワードが間違っている場合は、Webサーバーはステータスコード401を返却する。

### Location

- httpの応答コード302(リダイレクト)とLocationのヘッダはWebリクエストをリダイレクトするために用いられる。
- locationのフィールドにはリダイレクト先のURLが表される

### referer

### aタグにtarget="_blank"を設定

- target="_blank"のaタグには脆弱性がある。

### rel=noreferrerを設定しなかった場合

- フィッシング詐欺攻撃を受ける
- rel=”noreferrer”をつけることで、参照先に対して参照元のリンクを渡さないようにする。
- 例:<a href="[http://www.example.com/](http://www.example.com/)" rel=noreferrer>リンク</a>
- noreferrerをつけると、つまりリンク先のページから元ページの操作を防ぐことができる
- アクセス分析とするときにnoreferrerにすると、リファラを送らないため、アクセス分析が難しい場合があるのでnoopenerだけをつける時もある。
- target="_blank"で新しいタブで開くページは、元のページのwindow.openerオブジェクトを持ち、window.opener.documentオブジェクトを参照するため、元のページを操作することができるのでrel=noreferrerは必要

### httpレスポンスヘッダーを追加

origin-when-cross-origin

### HTTPヘッダークイズ

1. Httpレスポンスのステータスコードで好きなコードを2つと嫌いなコードを2つ述べ、それぞれ理由を述べよ。
2. 全てのrefererを書き出し、それぞれの役割を説明せよ。
3. そもそもhttpのリクエストとレスポンスとは何か、どのように動いているのかを説明せよ。