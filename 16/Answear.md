# インデックスを理解する

## インデックスの仕組み

インデックス(index)とは、索引の意味をもつ英単語でデータベースの表への検索処理を高速化させるもの。
データの検索は上から１つずつ探していく方法もあるが、大量にデータがある場合は効率が悪い。
例えば下記のようなテーブルがあるとする。

|No|name|age|address|position|
|----|----|----|----|----|
|1|Yamamoto|32|Nagoya|employee|
|2|Abe|28|Tokyo|employee|
|3|Kimura|36|Chiba|leader|
|4|Hatano|41|Osaka|manager|
|5|Ono|25|Tokyo|employee|

上記のテーブルからnameの値を検索する場合、データが順番に並んでいないためインデックスを作成すると効率がよくなる。

nameに対してインデックスをはった場合

|No|name|
|----|----|
|2|Abe|28|
|4|Hatano|
|3|Kimura|
|5|Ono|25|
|1|Yamamoto|

上記のように作られ、検索する際に高速になる。
ただ、インデックスを導入する際にメリットデメリットがある。

・インデックスを貼るメリット

データ参照の高速化
ソート作業の省略化

・インデックスを貼るデメリット

インデックスの情報を保存するため、ディスク容量を消費する
データが書き換えられるとインデックスも書き換えるので
INSERT/UPDATE/DELETE文のオーバーヘッドが増える

メリットデメリットを考えて導入する方が良い

## Slow query Logを調べる必要性

SQLの実行時間が指定した時間よりもかかってしまったSQLを全て出力することができる。
これにより、アプリケーション構築時や本番運用時にパフォーマンスのボトルネックとなっている
SQLを発見するのに大いに役に立つ。

スロークエリログが出力されるということは、応答に時間がかかったSQLがあったということのため
インデックスが適切に利用されていない場合がある。

そのため、先輩はパフォーマンスが悪くなっている事を懸念していると考えられる。

## カーディナリティとは何でしょうか

カーディナリティとはテーブルにカラムがあるとして、カラムに格納されているデータの種類がどのくらいあるのかを
カーディナリティという。

![high-low-cardinality-dimensions](https://user-images.githubusercontent.com/58420905/157041272-f31b51f7-e1ad-4e3f-892f-e632dbd080f2.png)


カラムに格納されているデータの種類が少ない場合は「カーディナリティが低い」といい、
カラムに格納されているデータの種類が多い場合は「カーディナリティが高い」という。

つまり、性別カラムにmen,womanの二つしか入らない場合は「カーディナリティが低い」し
Customer ID 111,222,1444のように一つのカラムにたくさんの一意な値が入る場合は
「カーディナリティが高い」という

## カバリングインデックスの説明

本体のテーブルを参照せずにインデックスのみを見る事をカバリングインデックスと呼ばれている。
つまり全てのSQLがインデックスだけを指している状態。

# 課題２
## WHERE句を1つだけ含むSELECTクエリを3つ考えてください
create index hoge on employees(last_name,hire_date);

結果

```
select last_name from employees where first_name like '%Pr%';
3428 rows in set (0.07 sec)

index作成後
3428 rows in set (0.10 sec)
```

```
select hire_date  from employees where hire_date like '1994%';
14835 rows in set, 1 warning (0.08 sec)

index作成後
14835 rows in set, 1 warning (0.07 sec)
```

```
select hire_date  from employees where gender = 'F';
120051 rows in set (0.12 sec)

index作成後
120051 rows in set (0.10 sec)
```

explain結果

```
mysql> explain select last_name from employees where first_name like '%Pr%';
+----+-------------+-----------+------------+------+---------------+------+---------+------+--------+----------+-------------+
| id | select_type | table     | partitions | type | possible_keys | key  | key_len | ref  | rows   | filtered | Extra       |
+----+-------------+-----------+------------+------+---------------+------+---------+------+--------+----------+-------------+
|  1 | SIMPLE      | employees | NULL       | ALL  | NULL          | NULL | NULL    | NULL | 299157 |    11.11 | Using where |
+----+-------------+-----------+------------+------+---------------+------+---------+------+--------+----------+-------------+
1 row in set, 1 warning (0.00 sec)
```

```
mysql> explain select hire_date  from employees where gender = 'F';
+----+-------------+-----------+------------+------+---------------+------+---------+------+--------+----------+-------------+
| id | select_type | table     | partitions | type | possible_keys | key  | key_len | ref  | rows   | filtered | Extra       |
+----+-------------+-----------+------------+------+---------------+------+---------+------+--------+----------+-------------+
|  1 | SIMPLE      | employees | NULL       | ALL  | NULL          | NULL | NULL    | NULL | 299157 |    50.00 | Using where |
+----+-------------+-----------+------------+------+---------------+------+---------+------+--------+----------+-------------+
1 row in set, 1 warning (0.00 sec)
```

```
mysql> explain select hire_date  from employees where hire_date like '1994%';
+----+-------------+-----------+------------+-------+---------------+------+---------+------+--------+----------+--------------------------+
| id | select_type | table     | partitions | type  | possible_keys | key  | key_len | ref  | rows   | filtered | Extra                    |
+----+-------------+-----------+------------+-------+---------------+------+---------+------+--------+----------+--------------------------+
|  1 | SIMPLE      | employees | NULL       | index | NULL          | hoge | 21      | NULL | 299157 |    11.11 | Using where; Using index |
+----+-------------+-----------+------------+-------+---------------+------+---------+------+--------+----------+--------------------------+
1 row in set, 2 warnings (0.00 sec)
```

# 課題3

indexあり

```
into employees values(5000002,'1958-05-01','Sachin','Tsukud','M','1997-11-30'),(5000003,'1958-05-01','Sachin','Tsukud','M','1997-11-30'),(5000004,'1958-05-01','Sachin','Tsukud','M','1997-11-30');
Query OK, 3 rows affected (0.01 sec)
```

indexなし

```
insert into employees values(5000007,'1958-05-01','Sachin','Tsukud','M','1997-11-30'),(5000008,'1958-05-01','Sachin','Tsukud','M','1997-11-30'),(5000009,'1958-05-01','Sachin','Tsukud','M','1997-11-30');
Query OK, 3 rows affected (0.00 sec)
Records: 3  Duplicates: 0  Warnings: 0
```

## INDEXがある場合とない場合で、INSERTにかかる時間にはどのような変化があったでしょうか？その理由を説明してください

テーブルあたりのインデックスの数はinsertのパフォーマンスに対して最も影響を与える要素。
たくさんのインデックスがあれば、実行もそれだけ遅くなる。

insert文はwhere句を持たないことから、インデックスの利点を直接受けられない唯一の処理。
## 上記の処理速度の変化はDELETE文にも生じるでしょうか？その理由を説明してください

insert文とは違い、delete文にはwhere句があるのでインデックスの恩恵に預かることができる。

ただ、条件を指定しない場合だとパフォーマンスは悪くなる。

全レコードを消すのなら、deleteではなくTRUNCATEが早い。

## クイズ

1.性別がMの人のレコードはいくつあるでしょうか

2.1998年に採用された人のレコードはいくつあるでしょうか

3.1990年に採用された男性のレコードはいくつあるでしょうか