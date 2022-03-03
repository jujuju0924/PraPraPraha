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

## 「それぞれのEmployeeが最後に担当したOrderと、その日付を取得してほしい」

## Customerテーブルで任意の１レコードのCustomerNameをNULLにしてください

## CustomerNameが存在するユーザを取得するクエリを作成してください

## CustomerNameが存在しない（NULLの）ユーザを取得するクエリを変えてください

## EmployeeId=1の従業員のレコードを、Employeeテーブルから削除してください

## OrdersとEmployeesをJOINして、注文と担当者を取得してください

## （削除された）EmloyeeId=1が担当したOrdersを表示しないクエリを書いてください

## （削除された）EmloyeeId=1が担当したOrdersを表示する（Employeesに関する情報はNULLで埋まる）クエリを書いてください