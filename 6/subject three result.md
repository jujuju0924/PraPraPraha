## 結果

# 特定のオリジンからのPOSTリクエストのみ許可
responseServer.jsのres.set('Access-Control-Allow-Origin', ' http://localhost:3001');
で特定のオリジンのみからアクセスを許可できるように変更
<img width="883" alt="Access-Control" src="https://user-images.githubusercontent.com/58420905/133884901-a00c9e1a-5a4e-4a74-b7c6-3f14d322ad67.png">
# Simple requestはpreflightが行われない
<img width="879" alt="simple" src="https://user-images.githubusercontent.com/58420905/133884906-37ea1669-9a76-4039-b481-2ce7ebb05142.png">
# Simple requestに該当しないときはpreflightが行われる
<img width="879" alt="simple" src="https://user-images.githubusercontent.com/58420905/133884908-788fd997-8dce-484d-b844-15514c508d00.png">
