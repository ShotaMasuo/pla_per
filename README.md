# アプリ名
PlaPer  - 予定・実績管理アプリケーション -

# 概要
予定と実績を登録し、立てた予定と実績の差を視覚的に把握できるアプリケーションです。
iPhoneと連携し、実績の登録が可能です。
Google,Twitterに予定と実績を出力することができます。

# 作成した理由
プログラミング学習をしていて、立てた予定に対して何時間学習したのかを管理したいと考え、作成しました。

## 🌐 URL

### **http://18.176.231.16/users/sign_in**  

# 機能
1. ユーザー機能( devise使用 )
    1. サインアップ
![signup](https://user-images.githubusercontent.com/63441901/90575389-3d9b1700-e1f6-11ea-941d-6a05d0b753d2.gif)
    1. ログイン
    1. ログアウト
    
![loginout](https://user-images.githubusercontent.com/63441901/90575571-a8e4e900-e1f6-11ea-809b-2ef338ee56cd.gif)


1. スケジュール機能
    1. 新規作成
        - 入力項目：　スケジュール名・時間（6:00-22:00 15分間隔）・色
    1. スケジュール表示
        - 日付移動可能
        > javascript 非同期通信
    1. 実績入力
        > jQuery 入力画面fadeIn
        > javascript 非同期通信
    1. 編集・削除
    
![schedule](https://user-images.githubusercontent.com/63441901/90575602-b9955f00-e1f6-11ea-91f0-e07be2d9f9f1.gif)

1. 友人機能
    1. 追加・削除
        > javascript インクリメンタルサーチ
    1. スケジュール表示
        - 日付移動可能
        > javascript 非同期通信
        
![friend](https://user-images.githubusercontent.com/63441901/90575779-24469a80-e1f7-11ea-866c-3128c9d9ee54.gif)

1. iPhoneアプリ （swift5）
    1. ユーザ検索
    1. 予定の表示
        > json形式でのデータ受信
    1. 実績の登録
        > json形式でのデータ送信

![iPhone](https://user-images.githubusercontent.com/63441901/90575881-6a9bf980-e1f7-11ea-937e-09092a014823.gif)


1. Twittter（API）連携機能
    1.　実績投稿

![twitter](https://user-images.githubusercontent.com/63441901/90575902-7c7d9c80-e1f7-11ea-9c9c-08a354219d38.gif)

1. Google（API）連携機能
    1. スプレッドシートへ出力

![google](https://user-images.githubusercontent.com/63441901/90575934-915a3000-e1f7-11ea-882c-90a6c10c6ddc.gif)


# サーバー
aws (インスタンスタイプ：t2.micro)

# DB
MySQL
