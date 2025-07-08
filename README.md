# aws-demo-js-app

テスト用アプリケーション

ECRへのプッシュ手順(リポジトリ名: demo-js-appの場合)
```
ログイン
aws ecr get-login-password --region ap-northeast-1 --profile <CLIプロファイル名> | docker login --username AWS --password-stdin <アカウントID>.dkr.ecr.ap-northeast-1.amazonaws.com

ビルド
docker buildx build --platform linux/amd64 -t demo-js-app .

タグ付け
docker tag demo-js-app:latest <アカウントID>.dkr.ecr.ap-northeast-1.amazonaws.com/demo-js-app:latest

PUSH
docker push <アカウントID>.dkr.ecr.ap-northeast-1.amazonaws.com/demo-js-app:latest
``` 
