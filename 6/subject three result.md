## 結果

# 特定のオリジンからのPOSTリクエストのみ許可
responseServer.jsのres.set('Access-Control-Allow-Origin', ' http://localhost:3001');
で特定のオリジンのみからアクセスを許可できるように変更
![Access-Control.png](./images/Access-Control.png)
# Simple requestはpreflightが行われない
![simple.png](./images/simple.png)
# Simple requestに該当しないときはpreflightが行われる
![preflight.png](./images/preflight.png)