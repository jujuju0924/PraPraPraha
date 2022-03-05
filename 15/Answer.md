# 課題１

## 「常連顧客を特定して欲しい」と頼まれました
## 1996年に3回以上注文したCustomerのIDと、注文回数を取得してみてください

```
SELECT CustomerID,COUNT(CustomerID) AS OrderCount
FROM Orders
WHERE OrderDate LIKE '1996%'
GROUP BY CustomerID
HAVING OrderCount >= 3
ORDER BY OrderCount DESC
```

## 最もよく注文してくれたのは、どのCustomer
65,63,20
## 「一度の注文で、最大どれくらいの注文詳細が紐づく可能性があるのか」調べる必要が生じた。過去最も多くのOrderDetailが紐づいたOrderを取得してください。

```
SELECT OrderID,COUNT(OrderID) AS OrderDetailCount
FROM OrderDetails
GROUP BY OrderID
ORDER BY OrderDetailCount DESC
```

## 「一番お世話になっている運送会社を教えて欲しい」

```
SELECT Shippers.ShipperID,COUNT(Orders.ShipperID) AS ShippingCount 
FROM Orders JOIN Shippers ON Shippers.ShipperID = Orders.ShipperID
GROUP BY Shippers.ShipperID
ORDER BY ShippingCount DESC
```

## 「重要な市場を把握したい」と頼まれました。売上が高い順番にCountryを並べてみる

```
SELECT ROUND(SUM(Price * Quantity)) AS sales,Country FROM Orders 
JOIN Customers ON Orders.CustomerID = Customers.CustomerID
JOIN OrderDetails ON OrderDetails.OrderID = Orders.OrderID
JOIN Products ON OrderDetails.ProductID = Products.ProductID
GROUP BY Country ORDER BY sales DESC
```
## 国ごとの売上を年毎に集計してください

```
SELECT ROUND(SUM(Price * Quantity)) AS sales, strftime('%Y',Orders.OrderDate) AS OrderYear, Country 
FROM Orders 
JOIN Customers ON Orders.CustomerID = Customers.CustomerID
JOIN OrderDetails ON OrderDetails.OrderID = Orders.OrderID
JOIN Products ON OrderDetails.ProductID = Products.ProductID
GROUP BY Country, OrderYear
```

## 「社内の福利厚生の規定が変わったので、年齢が一定以下の社員には、それとわかるようにフラグを立てて欲しい」

### フラグを作る
```
ALTER TABLE Employees
ADD Junior BOOLEAN NOT NULL DEFAULT false
```

### BirthDateが1960以上ならTrue

```
UPDATE Employees SET Junior = CASE WHEN strftime('%Y',BirthDate) > '1960' THEN TRUE ELSE FALSE END
```

## 「長くお世話になった運送会社には運送コストを多く払うことになったので、たくさん運送をお願いしている業者を特定して欲しい」

### long_relationカラムを追加

```
ALTER TABLE Shippers
ADD long_relation BOOLEAN NOT NULL DEFAULT false
```

### 70回以上、Orderに関わったShipper


```
UPDATE Shippers SET long_relation = CASE WHEN ShipperID IN (
SELECT ShipperID
FROM Orders 
GROUP BY ShipperID 
HAVING COUNT(ShipperID) >= 70)
THEN true
```

## 「それぞれのEmployeeが最後に担当したOrderと、その日付を取得してほしい」

```
SELECT OrderID,EmployeeID,MAX(OrderDate) AS LatrestOrderDate FROM Orders GROUP BY EmployeeID
```

## Customerテーブルで任意の１レコードのCustomerNameをNULLにしてください

```
UPDATE Customers SET CustomerName = NULL WHERE CustomerName = 'Alfreds Futterkiste'
```

## CustomerNameが存在するユーザを取得するクエリを作成してください

```
SELECT * FROM Customers WHERE CustomerName IS NOT NULL
```

## CustomerNameが存在しない（NULLの）ユーザを取得するクエリを変えてください

```
SELECT * FROM Customers WHERE CustomerName IS NULL
```

## EmployeeId=1の従業員のレコードを、Employeeテーブルから削除してください

```
DELETE FROM Employees WHERE EmployeeID = 1;
```

## （削除された）EmloyeeId=1が担当したOrdersを表示しないクエリを書いてください

```
SELECT OrderID,CustomerID,Employees.EmployeeID,OrderDate,ShipperID FROM Orders JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID
```

## （削除された）EmloyeeId=1が担当したOrdersを表示する（Employeesに関する情報はNULLで埋まる）クエリを書いてください

```
SELECT OrderID,CustomerID,Employees.EmployeeID,OrderDate,ShipperID FROM Orders LEFT JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID WHERE Employees.EmployeeID IS NULL
```

# 課題2

## WHEREとHAVING違い
まずWHERE句はSUM,AVG,COUNT等の集計関数を用いることができない。
WHEREは初めに行の絞り込みを行い、その次にグループ化、集計・列選択をする。

HAVINGは集計結果が全てそろった段階で絞り込みが行われる。

HAVINGの流れはWHERE句による検索→GROUP BYでグループ化→集計関数による集計と、列選択が終わった後に
絞り込みを行うイメージ
## DDL
Data Definition Languageの略で、データ定義言語と呼ばれる。
データベースの構造や構成を定義するために用いられるのが多い。
DDLとされるコマンドは
・テーブルやビューなどの作成を行うCREATE文
・削除するDROP文
・変更を加えるALTER文
・データを全削除するTRUNCATE文
などがある。
## DML
Data Manipulation Languageの略で、データ操作言語と呼ばれる。
データベースを管理・操作するための言語の一種で、データベースに記録されたデータの参照や操作を行う。
一番用いられることが多い。
・SELECT文（検索・抽出）
・INSERT文（データの追加）
・UPDATE文（データの更新）
・DELETE文（データの削除）
などがある。
## DCL
Data Control Languageの略で、データ制御言語と呼ばれる。
データベースの登録利用者にデータの読み込み、登録、変更、削除などを行う権限を与えたり奪ったりするのに用いる。
・GRANT文（権限を与える）
・REVOKE文（権限を奪う）
などがある。
## TCL
Transaction Control Languageの略で、トランザクションの開始や終了の命令の総称。
・COMMIT
・ROLLBACK
などがある。

課題３（クイズ）

問題1

社員表

|社員番号|社員名|給与|部署番号|
|------|------|---|----|
|100010|沢木翔一|210000|302|
|100011|野田奈央子|330000|301|
|100012|黒沢さおり|270000|202|
|100013|野村雅也|320000|301|
|100014|児玉亮|350000|101|

検索結果

|部署番号|社員番号|社員名|
|------|------|---|
|101|100014|児玉亮|
|202|100012|黒沢さおり|
|301|100011|野田奈央子|
|301|100013|野村雅也|
|302|100010|沢木翔一|

検索結果のになるようなSQLはどれか

a．SELECT 部署番号, 社員番号, 社員名 FROM 社員 ORDER BY 部署番号, 社員番号

b．SELECT 部署番号, 社員番号, 社員名 FROM 社員 GROUP BY 部署番号

c．SELECT 部署番号, 社員番号, 社員名 FROM 社員 ORDER BY 社員番号, 部署番号

d．SELECT 部署番号, 社員番号, 社員名 FROM 社員 GROUP BY 社員番号

問題2
DBMSのトランザクションに関する説明のうち、適切なものを次の中から選択してください。

a．トランザクションとは、表にデータを入出力する単位である
b．トランザクションの終了はCOMMIT文、ROLLBACK文にて行う
c．トランザクションが異常終了した場合にはロールフォワードを行う
d．バックアップ以降の更新データを反映させ、障害発生前の状態に戻すためにROLLBACK文を発行する

問題3
下記のSQL文の中から、データ定義言語（DDL）に分類されるものを選択してください。

a．COMMIT
b．DELETE
c．CREATE
d．INSERT