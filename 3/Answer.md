### 課題２（質問）

### application/x-www-form-urlencodedの場合

- a=1&b=1のようなクエリパラメーター
- 例えば上記の場合はaがキーになり、1がバリューになる
- キーとバリュー以外の文字はパーセントエンコーディングされるため、multipart/form-dataを使用する
- 例えばhtmlページのフォームボタンで

```
<form action="http://foo.com" method="post">
  <div>
    <label for="say">What greeting do you want to say?</label>
    <input name="say" id="say" value="Hi">
  </div>
  <div>
    <label for="to">Who do you want to say it to?</label>
    <input name="to" id="to" value="Mom">
  </div>
  <div>
    <button>Send my greetings</button>
  </div>
</form>
```

この場合はPOSTメソッドが送信されるとsay=Hi&to=Momとなる。

sayはinput nameのキーでHiはvalueのた上記のようなクエリパラメーターとなる

### application/jsonの場合

- {"a":1,"b":2}のようなJSON文字列データ
- JSONの場合はフォームデータリクエストのエンコーディングには適合していない。

### 個人的なmemo

- SPA開発でFetch APIを使っているがその場合はForm DataオブジェクトかJSONをサーバー側に送るケースが実務では行われている。
- FetchApiを使用した場合はx-www-form-urlencodedが使われることはないのか？
- クエリストリングを使用する場合はどのcontent-typeになるのか。
- [https://qiita.com/masakielastic/items/70516e074eadf2ce09dd](https://qiita.com/masakielastic/items/70516e074eadf2ce09dd)
- [https://gray-code.com/javascript/sending-json-data-by-fetch-api/](https://gray-code.com/javascript/sending-json-data-by-fetch-api/)

### 参考ページ

[https://qiita.com/bellcrud/items/1c7c73d42df10b4107c0](https://qiita.com/bellcrud/items/1c7c73d42df10b4107c0)

[https://developer.mozilla.org/ja/docs/Web/HTTP/Methods/POST](https://developer.mozilla.org/ja/docs/Web/HTTP/Methods/POST)

[https://developer.mozilla.org/ja/docs/Learn/Forms/Sending_and_retrieving_form_data](https://developer.mozilla.org/ja/docs/Learn/Forms/Sending_and_retrieving_form_data)

[https://developer.mozilla.org/ja/docs/Learn/Forms/Sending_forms_through_JavaScript](https://developer.mozilla.org/ja/docs/Learn/Forms/Sending_forms_through_JavaScript)

[https://uefir.com/article/3782f4ac6da3a6ab515b15528a4a00a9](https://www.notion.so/3782f4ac6da3a6ab515b15528a4a00a9)

[https://zenn.dev/amezousan/articles/2020-10-15-http-basic](https://zenn.dev/amezousan/articles/2020-10-15-http-basic)

[https://qiita.com/shibuchaaaan/items/bab03f10f8be8484b693](https://qiita.com/shibuchaaaan/items/bab03f10f8be8484b693)