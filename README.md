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
![Uploading loginout.gif…]()


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
![Uploading schedule.gif…]()
1. friend
    1. 追加・削除
        > javascript インクリメンタルサーチ
    1. スケジュール表示
        - 日付移動可能
        > javascript 非同期通信

1. iPhone App（swift5）
    1. ユーザ検索
    1. 予定の表示
        > json形式でのデータ受信
    1. 実績の登録
        > json形式でのデータ送信

1. Twittter API
    1.　実績投稿
          > Twitter API
  
1. Google API
    1. スプレッドシートへ出力
        > Twitter API

# server
aws (インスタイプ：t2.micro)

# DB
MySQL
