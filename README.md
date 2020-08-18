# WHAT
予定と実績を並べて比較できるアプリケーションです。

# WHY
プログラミングを独学していた際、カレンダーアプリに予定を入力し進めていました。
その予定に対して実際どのくらいやったのかを管理するアプリケーションがなかったため、今回作成しました。

# function
1. user ( devise使用 )
    1. サインアップ    
![signup](https://user-images.githubusercontent.com/63441901/90575389-3d9b1700-e1f6-11ea-941d-6a05d0b753d2.gif)
    1. ログイン
    1. ログアウト
    
![loginout](https://user-images.githubusercontent.com/63441901/90575571-a8e4e900-e1f6-11ea-809b-2ef338ee56cd.gif)


1. schedule
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

1. friend
    1. 追加・削除
        > javascript インクリメンタルサーチ
    1. スケジュール表示
        - 日付移動可能
        > javascript 非同期通信
        
![friend](https://user-images.githubusercontent.com/63441901/90575779-24469a80-e1f7-11ea-866c-3128c9d9ee54.gif)

1. iPhone App（swift5）
    1. ユーザ検索
    1. 予定の表示
        > json形式でのデータ受信
    1. 実績の登録
        > json形式でのデータ送信

![iPhone](https://user-images.githubusercontent.com/63441901/90575881-6a9bf980-e1f7-11ea-937e-09092a014823.gif)


1. Twittter API

    1.　実績投稿
          > Twitter API

![twitter](https://user-images.githubusercontent.com/63441901/90575902-7c7d9c80-e1f7-11ea-9c9c-08a354219d38.gif)

1. Google API
    1. スプレッドシートへ出力
        > Twitter API

![google](https://user-images.githubusercontent.com/63441901/90575934-915a3000-e1f7-11ea-882c-90a6c10c6ddc.gif)


# server
aws (インスタイプ：t2.micro)

# DB
MySQL
