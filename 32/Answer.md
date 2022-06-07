# 課題１
## SOLID原則
### SRP:Single Responsibility Principle（単一責任の原則）
クラスの責務は1つにすること、クラスを変更する理由は1つ以上存在してはならないということ

例えば受注クラス、発注クラス、メール送信クラスがあったとして、メール送信のメールアドレスが変更になったとする。
受注、発注、メールを全て同じクラスにしていた場合はインスタンス化したメールアドレスを受注、発注、メールのメソッドの中で
使用していた場合は、全部のメソッドの中で変更する必要がある。

受注、発注、メールのクラスを全て分けていた場合は、メールのクラスの中だけを変更し、受注と発注側のクラスで別々にインスタンス化を行えば変更する箇所はメールクラスだけで良くなるため、できる限り細かく部品化しましょうということ。

```
class OrderReceived
{
  public function __construct(Order $order Mail $mail)
  {
     $this->order = $order;
     $this->mail  = $mail;
  }
}

class Order
{
  echo 'hoge';
}

class Mail
{
  echo 'fuga';
}
```

のようにそれぞれ部品化して影響範囲を限定的にする

### OCP:Open Closed Principle(オープン・クローズドの原則)
ソフトウェアの構成要素は拡張に対して開いていて、修正に対して閉じていなければならないという原則

例えばポイントシステムに追加の要件が加わったときに、新しいクラスを加えるとする。
そのときに、既存の問題ないプログラムはそのままにしたい。

そこで既存のポイントシステムのクラスに手を加えずに新しい機能を追加していく。
これが「拡張に対して開いている」ということ。古いポイントシステムのクラスはいじらない。

「修正に対して閉じている」とは古いポイントシステムクラスに変更があった場合に
古いポイントシステムクラスのみを変更すれば修正完了となること。

クラスを継承するやり方は良くない。スーパークラスの中身を全て見ないと行けないので時間がかかる。
その場合は古いポイントシステムと新しいポイントシステムのインターフェースを作る必要がある。

```
class OldPoint implements Card
{

}

class NewPoint implements Card
{

}

interface Card
{
  $kocomoCard = 1 * 1.1;
  $pokekeCard = 1 * 2.2;

  // クラスの中を書き換えるのではなく、インターフェース内で完結させてクラスはそのままにする
}
```

上記がオープンクローズドの原則

### L:Liskov Substitution Principle(リスコフの置換原則)
子クラスが親クラスと同じ動作を実行できない場合、バグになる可能性がある。

クラスから別のクラスを作ると、クラスが親になり、新しいクラスが子になる。子クラスは、親クラスができることを全てできる必要がある。
このプロセスを継承と呼ぶ。

```
class raityu extends pokemon
{

}

class pokemon
{
   $status = ['HP','POWER'];
}
```

ライチュウクラスはポケモンを継承している。
つまり、ライチュウはポケモンのステータスを使用できるが、逆はできない。

子クラスが大きく変更されて親クラスの内容を使用できなければ、リスコフの置換原則に違反する

### I:Interface Segregation Principle(インターフェイス分離の原則)
「クライアントが使用しないメソッドへの依存を強制すべきしないべき」という原則。

インターフェースを使ってインターフェースと実装を分離することで、クライアントは実装の詳細を
知る必要がなくなり、クラス間を疎結合にすることができる。

例えば

```
interface AnimalInterface
{
  public function fly();
  public function run();
  public function swim();
}

class Human implements HumanInterface
{
  public function fly()
  {
    var_dump('飛ぶ');
  }

  public function run()
  {
    var_dump('走る');
  }

  public function swim()
  {
    var_dump('泳げる');
  }
}
```

上記のようなインターフェースがあったときに人間は飛べない。
インターフェース分離の原則を守ると下記のような書き方になる。

```
interface HumanFlyingInterface
{
  public function fly();
}

interface HumanRunningInterface
{
  public function run();
}

interface HumanSwimmingInterface
{
  public function swim();
}

class Human implements HumanRunningInterface,HumanSwimmingInterface
{
  public function run()
  {

  }

  public function swim()
  {

  }
}
```

上記のように必要なものだけ継承しましょうということ

### D Dependency inversion principle(依存性逆転の原則)
上位レベルのモジュールは下位レベルのモジュールに依存すべきではない。両方とも抽象に依存すべきである。
抽象は詳細に依存してはならない。詳細が抽象に依存すべきである。

上位モジュールはユーザーに近い部分部分の箇所。
下位モジュールは上位モジュールから呼び出される。外部との連携などに下位モジュールは使われる。

上位モジュールは例えば、顧客からボタンを押したらデータを保存する

まず「依存」するとはどういうことなのか説明する。

```
class Customer
{
  public function pay() :string
  {
    $payment = new BankingPayment;
    $payment->execute;
  }

  public function draw() :string
  {
    $payment = new BankingPayment;
    $payment->execute;
  }
}

class BankingPayment
{
  public function execute
  {
    echo '支払処理';
  }
}

class BankingDraw
{
  public function execute
  {
    echo '引き出し処理';
  }
}
```

Customer → BakingPayment
Customer → BankingDraw

上記の記述だとCustomerクラスはBakingPaymentクラスとBankingDrawクラスに依存している状態となります。
上位クラスはCustomerで下位クラスはBakingPaymentとBankingDrawです。

もし仮にBakingPaymentとBankingDraw内で返却する処理が変わった場合は
呼び出している上位モジュール側の処理も変える必要があります。

お互いの依存関係を無くしたいのですが

Customer ← BakingPayment
Customer ← BankingDraw

だと今度は逆にCustomerに依存が集中してしまいます。
そこでinterfaceにCustomerとBakingPaymentとBankingDrawを依存させてしまいます。

Customer → interface ← BankingPayment
Customer → interface ← BankingDraw

とすることでinterfaceに二つのクラスを依存させます。

```
interface BankingInterface
{
  public function BakingPayment()
  {
     echo '支払処理';
  }
  public function BankingDraw()
  {
     echo '引き出し処理';
  }
}

class Customer implements BankingInterface {
  public function BakingPayment()
  {

  }

  public function BankingDraw()
  {

  }
}
```

上記のようにBankingPaymentとBankingDrawがinterfaceに逆に依存していることを
依存性逆転の原則と呼びます。




## 単一責任の原則と、単純にファイルを細かなファイルに分解することには、どのような違いがあるでしょうか？
ファイルを分割したとしても、例えば各ファイルに「銀行口座」クラスが書いてあったら責務バラバラになってしまう。
AファイルにもBファイルにもCファイルにもA銀行の口座情報が書いてあればそれだけ変更しなければならない。

単一責任の原則はクラスの責務は一つにすることなので、「銀行口座」クラスがありAファイルにA銀行の口座
 BファイルにB銀行の口座、CファイルにC銀行の口座のように一つのクラスの変更は一つのクラスが責任を持つ

## Open-Closed-Principleの実例を一つ考えて、作成してみてください。

```
interface Purchase {
  userId: string
  productId: string
  transaction: {
    succeeded: true
    completedAt: Date
  }
}

interface PaymentRecordRepo {
  getPurchasesBy: (userId: string) => Purchase[]
  sellPurchaseBy: (productId: string) => Purchase[]
}

class PurchaseService {
  public constructor(private paymentRecordRepo: PaymentRecordRepo) {}

  public purchase(userId: string, productId: string) {
    const allPurchases = this.paymentRecordRepo.getPurchasesBy(userId)
    const pastPurchase = allPurchases.find((p) => p.productId === productId && p.transaction.succeeded)
    if (pastPurchase) {
      throw new Error('この商品はおひとりさま一品限定です！')
    }


class SellPurchaseService {
  public constructor(private paymentRecordRepo: PaymentRecordRepo) {}

  public sellPurchase(productId: string) {
    this.paymentRecordRepo.sellPurchaseBy(productId)
  }
}
```

SellPurchaseServiceクラスを追加したが、既存のPurchaseServiceクラスは変更しておらず
拡張に対しては問題なく開かれており、修正に対しては閉じている。