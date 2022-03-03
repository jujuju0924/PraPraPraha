# WEBサービスの代表的な脆弱性を理解する

# 課題1（質問）

## XSS

### 仕組み

インターネット掲示板などの動的なWEBサイトにある入力フォームに（脆弱性のあるサイトへ誘導するスクリプトを含んだリンク）を設置する。

主な原因はHTML生成時に文法上特別な意味を持つ特殊記号を正しく扱っていないため、意図しない形でHTML・JavaScriptを注入・変形できる。

メタ文字の持つ特別な意味を打ち消すエスケープ処理が必要。

### 被害

クッキー値の盗み出し、Javascriptによる攻撃、画面の書き換え

クッキー値盗み出しの流れ

罠サイトのiframe内に脆弱なサイトを表示。

脆弱なサイトはXSSによりクッキー値をクエリ文字につけて遷移。

情報収集ページは受け取ったクッキー値をメールで攻撃者に送信。

### 対処法

### 必須対策 (個別の対策)

- HTMLの要素内容はhtmlspecialchrs関数によりエスケープ

要素内容には[<]と[&]をエスケープ

- 属性値はhtmlspecialchrs関数によりエスケープしてダブルクォートで囲む

属性値にはダブルクウォートで囲って[<]と[“]と[&]をエスケープ

### 必須対策 (共通対策)

- HTTPレスポンスに文字エンコードを明示

Webアプリケーション側とブラウザ側で文字エンコーディングに差異があるとXSSの原因になりうる。

例:PHPの文字エンコーディング

```php
header(‘Content-Type: text/html charset=UTF-8’);
```

### 保険的対策

- 入力値を検証

入力値が条件に一致しない場合にエラーにする。

入力値検証がXSS対策となり得るには入力値の条件が自由形式ではなく、英数字限定のみ。

- クッキーによるHttpOnly属性を付与
- TRACEメソッドを無効化

クロスサイト・トレーシング(XST)というJavaScriptでHTTPのTRACEメソッドを送信することでクッキー値、Basic認証パスワードを盗み出すことのできる脆弱性があり、XSSと組み合わせることにより危険性が増す。

そのため,TRACEメソッドをサーバー側で受け付けない設定が必要。

最近のブラウザでは既に対策が取られているため、特殊な場合をのぞき対策は不要

## コマンドインジェクション

### 仕組み

OSコマンドインジェクションとも呼ばれ、サーバーを構築するOSに脆弱性がある場合に、悪意のある第三者が脆弱性を悪用して不正にコマンド処理を実行させるもの。

本来、管理権限を持つユーザーでなければ、Webサーバーに対してコマンドを入力し処理されることはないが、外部からの入力を必要とするWEBアプリケーションやプログラムを介して、OSに直接命令を与え、不正に実行されてしまうことがある。

不正な操作によって悪意があるユーザーがシェルに命令を実行し、管理者権限を奪われてしまうことがある。

管理権限を奪うことで、サーバーの持ち主や管理者に被害を与える。

### 被害

- 情報の漏洩
- サイトの改ざんやウィルスの感染

### 対処法

- コマンドを利用するシステムの実装は避ける
- 外部入力からのシェルを利用不可にする
- 不正な入力やコマンド実行を監視・検知する

## SQLインジェクション

### 仕組み

SQLインジェクションは、不正な「SQL」の命令を攻撃対処のWEBサイトに「注入する（インジェクションする」こと。

例えばセキュリティの対策が十分でないウェブサイトに、サイト内を任意キーワードで検索できるフォームがあるとする。攻撃者がそのフォームへ不正な内容を盛り込んだSQL文を入力し検索を行うことで、不正なSQLが実行されてしまう。

本来は隠されているはずのデータが奪われたり、ウェブサイトが改ざんされてしまう。

### 被害

### **秘密情報・個人情報の漏洩**

不正なSQLの命令が実行されてしまい、それら個人情報がすべて奪われてしまう可能性がある。

たとえば脆弱性のあるウェブサイトのウェブフォームに、「データベースに登録されている会員情報すべて表示しなさい」という内容のSQLの命令を入力するとします。対策がきちんとされていなければ、その命令がそのまま実行されてしまい、会員情報がすべて奪われてしまう。

2011年4月には、ソニーが展開するゲーム用のサービス「PlayStation Network」において、SQLインジェクション攻撃が行われ大きなニュースとなった。この攻撃によって、約7,700万人分の個人情報が奪われてしまったのです。奪われた情報のなかには、会員の氏名・住所・メールアドレス・生年月日をはじめサービス用の会員ID・パスワードなどが含まれていました。2013年4月に判明した「エクスコムグローバル」の事件のように、約11万人分のクレジットカード情報（名義・カード番号・セキュリティコードなど）が漏洩した、という事例もある。

最近では2019年1月に「釣りビジョン」というウェブサイトにおいて、会員のメールアドレスや氏名・住所など6万件以上もの情報が盗まれる事件が発生した。

### **ウェブサイトの改ざん**

またSQLインジェクション攻撃により、対象のウェブサイトを改ざんすることもできる。そのうえで改ざんされたサイトへアクセスすることによって、ウイルス感染させられるという場合もある。

2008年には政府・自治体のサイト・商用サイトを含め数十万にものぼるウェブページが、SQLインジェクションによって改ざんされてしまう被害が発生した。それらのサイトを訪れると、マルウェアに感染してしまう状態。現在でも、数多くのサイトがSQLインジェクションによって改ざん被害を受けている。

### 対処法

### エスケープ処理の実施

特別な意味を持つ記号文字が普通の文字として解釈されるように処理する

$p=foo' or 'a'='a の場合：
SELECT * FROM a WHERE id='foo'' or ''a''=''a';

つまり'(シングルクォート）が普通の文字として解釈される

### バインド機構を利用

エスケープ処理をする必要がなくなる

$sth = $dbh->prepare(
"SELECT id, name, tel, address, mail FROM usr
WHERE uid=? AND passwd=?");
$sth->execute($uid, $passwd);

？がプレースホルダ

$uidと$passwdがバインド変数

### 保険的対策

エラーメッセージを非表示

データベースアカウントの権限見直しなど

出典:[https://www.ipa.go.jp/files/000024396.pdf](https://www.ipa.go.jp/files/000024396.pdf)

## CSRF

### 仕組み

WEBアプリケーションの脆弱性を悪用するサイバー攻撃の一種で「サイト横断的に(Cross Site)リクエストを偽装(Request Forgeries)する」攻撃。

CSRFと略されシーサーふと呼ばれることが多い。

攻撃者は罠となるサイトを用意し、ユーザーが罠にかかるのを待つかリンクやメールなどで利用者を罠サイトへ誘導する。

誘い込まれたユーザーが罠サイトにアクセスし、ユーザーがターゲットとなるウェブサイトへログイン状態になっていると、そのウェブサイトに偽のリクエストが送信、実行されてしまう攻撃。

XSSと名称が似ており、罠サイトを経由して攻撃するという点は同じだが、罠サイトにユーザーがアクセスすることで、最終的にブラウザ上で不正なスクリプトを実行させられてしまうXSSに対し、 CSRFはユーザーがウェブサイトへログイン状態であることを狙い、罠サイトを経由したターゲットのウェブサイトに偽のリクエストを送信する。

### 被害

不正プログラムを仕込んだウェブサイトのリンクをクリックして、別のサイトに書き込みをさせられた事例がある。

[https://www.nikkei.com/article/DGXZZO48415000U2A111C1000000/](https://www.nikkei.com/article/DGXZZO48415000U2A111C1000000/)

### 対処法

フォームを表示するプログラムによって他者が推定困難なランダム値を hiddenフィールドとして埋め込み送信し、フォームデータを処理するプログラムによってそのランダム値がフォームデータ内に含まれていることを確認する。

そのランダム値がフォ－ムデータに含まれていない場合、処理を見合わせるようにする方法がある。

### **照合情報**

照合情報には、他者が推測困難な値を用いる。そのような値として下記の 3つが挙げられる。

- セッションIDそのもの もしくは セッションIDから導かれるハッシュ値 等
- セッション開始時に一度生成され各ページで使われる、セッションIDとは無関係の値
- ページごとに生成される、毎回異なる値（ページトークン）

ただし、最近ではページトークンを自動生成してくれるWebアプリケーションフレームワークも珍しくなくなってきている。そのようなフレームワークを使う場合、わざわざ「セッションIDそのもの」や、その派生値を選択する必要はない。

照合情報の検証においては、実際に値を「照合」する。例えば、特定のアルゴリズムが満足させられることをもって適正と判断する方式では、攻撃者が自分自身に宛てて発行された照合用情報を罠の中に仕込むことによって対策を迂回することができてしまう。

### **フレームワークの選択**

フォームへの照合情報の埋め込みを自動的に行う Webアプリケーションフレームワークがあり、増えつつある。（例： Ruby on Rails、 Grails、CakePHP 等）（参考：[「フレームワークの選択」](https://www.ipa.go.jp/security/awareness/vendor/programmingv2/contents/004.html)）

このような Webアプリケーションフレームワークが選択されている場合、その照合情報の埋め込み機能が有効となるように設定し、照合情報の検証を行う。

### **TLS の使用**

リクエスト強要（CSRF）対策に用いる照合情報は、他者に傍受されると都合が悪い。また、リクエスト強要（CSRF）対策が必要となる場面においては、ユーザやWebアプリケーションにとって重要なデータが送受信されることが十分考えられる。したがって、この場面においては、TLS（Transport Layer Security）の使用が不可欠である。

出典:[https://www.ipa.go.jp/security/awareness/vendor/programmingv2/contents/301.html](https://www.ipa.go.jp/security/awareness/vendor/programmingv2/contents/301.html)

### 課題２（クイズ）

### CSRFの攻撃の対策として、効果がないものはどれか

- Webサイトでの決済などの重要な操作の都度，利用者のパスワードを入力させる。
- Webサイトへのログイン後，毎回異なる値をHTTPレスポンスに含め，Webブラウザからのリクエストごとに送付されるその値を，Webサーバ側で照合する。
- Webブラウザからのリクエスト中のRefererによって正しいリンク元からの遷移であることを確認する。
- WebブラウザからのリクエストをWebサーバで受け付けた際に，リクエストに含まれる"<"や">"などの特殊文字を，タグとして認識されない"&lt;"や"&gt;" などの文字列に置き換える。

### SQLインジェクション攻撃の説明はどれか

- Webアプリケーションに問題があるとき，悪意のある問合せや操作を行う命令文を入力して，データベースのデータを不正に取得したり改ざんしたりする攻撃
- 悪意のあるスクリプトを埋め込んだWebページを訪問者に閲覧させて，別のWebサイトで，その訪問者が意図しない操作を行わせる攻撃
- 市販されているDBMSの脆弱性を利用することによって，宿主となるデータベーサーバを探して自己伝染を繰り返し，インターネットのトラフィックを急増させる攻撃
- 訪問者の入力データをそのまま画面に表示するWebサイトに対して，悪意のあるスクリプトを埋め込んだ入力データを送ることによって，訪問者のブラウザで実行させる攻撃

### クロスサイトスクリプティングに該当するものはどれか。

- Webアプリケーションのデータ操作言語の呼出し方に不備がある場合に，攻撃者が悪意をもって構成した文字列を入力することによって，データベースのデータの不正な取得，改ざん及び削除を可能とする。
- Webサイトに対して，他のサイトを介して大量のパケットを送り付け，そのネットワークトラフィックを異常に高めてサービスを提供不能にする。
- 確保されているメモリ空間の下限又は上限を超えてデータの書込みと読出しを行うことによって，プログラムを異常終了させたりデータエリアに挿入された不正なコードを実行させたりする。
- 攻撃者が罠(わな)を仕掛けたWebページを利用者が閲覧し，当該ページ内のリンクをクリックしたときに，不正スクリプトを含む文字列が脆弱なWebサーバに送り込まれ，レスポンスに埋め込まれた不正スクリプトの実行によって，情報漏えいをもたらす。


## 有効な防御手段を説明して下さい

- コマンドインジェクション

入力

; cat /etc/passwd

実行結果

```
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
_apt:x:100:65534::/nonexistent:/bin/false
mysql:x:101:101:MySQL Server,,,:/nonexistent:/bin/false
```

対処法

シェルを起動できる言語機能の引数を構成する変数に対し、引数に埋め込む前にチェックをかけ、本来想定する動作のみを実行するように実装する。

チェック方法には、その引数に許可する文字の組み合わせを洗い出し、その組み合わせ以外は許可しない「ホワイトリスト方式」の実装。

- SQLインジェクション

入力

1' or 'a' = 'a

実行結果

```
ID: 1' or 'a' = 'a
First name: admin
Surname: admin
```

```
ID: 1' or 'a' = 'a
First name: Gordon
Surname: Brown
```

```
ID: 1' or 'a' = 'a
First name: Hack
Surname: Me
```

```
ID: 1' or 'a' = 'a
First name: Pablo
Surname: Picasso
```

```
ID: 1' or 'a' = 'a
First name: Bob
Surname: Smith
```

対処法

SQL文の組み立ては全てプレースホルダとバインド処理を行う。

- CSRF

入力

下記のようなhtmlファイルを作成

<form action="http://localhost/vulnerabilities/csrf" method="GET">
 <input name="password_new"><br>
 <input name="password_conf"><br>
 <input type="submit" value="Change" name="Change">
</form>

ブラウザで開きpasswordをchangeする

実行結果

DVWAの画面に遷移し、パスワードが変更された後の画面が出る。

対処法

処理を実行するページをPOSTメソッドでアクセスするようにし、その「hiddenパラメータ」に秘密情報が挿入されるよう、前のページを自動生成して、実行ページではその値が正しい場合のみ処理を実行する。

- XSS

入力

<script>alert("Hello")</script>

実行結果

画面にwindowアラートでHello表示

対処法

ウェブページに出力する全ての要素に対して、エスケープ処理を施す。

