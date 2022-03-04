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