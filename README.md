# ALPHA Twitter Frontend Web
***
此為simple twitter專案的前端入口，使用React.js做為開發框架，專案採前後分離的開發模式，小組成員共有四人，兩人負責前端，兩人負責後端。

後端Github Repository網址： [Simple Twitter API](https://github.com/dinsky21/twitter-api-2020)

### 小組成員
***
前端
* [Jasmine](https://github.com/Jasminechych)
* [Miki](https://github.com/kumomiki)

後端
* [Johnny](https://github.com/dinsky21)
* [Chloe](https://github.com/Chloe905)
### 專案畫面如下
***
#### 登入頁
可透過以下測試資料進行登入(user僅能登入前台;admin僅能登入後台)
##### user
``` 
email: user1
password: 12345678
```
##### admin
``` 
email: root
password: 12345678
```
***
### 後台

#### 登入頁
![image](https://user-images.githubusercontent.com/100898369/228001032-7b2fe67d-4b6f-4d7e-a823-5ddadde6a2f1.png)

#### 推文清單
![image](https://user-images.githubusercontent.com/100898369/228002640-4a5f66bd-d5f9-43c4-be95-e9a518bee423.png)

#### 使用者清單
![image](https://user-images.githubusercontent.com/100898369/228002716-f31ef7b7-327e-4c94-a6df-9b7776bc574d.png)

***
### 前台
#### 註冊頁
![image](https://user-images.githubusercontent.com/100898369/228000704-23467bc8-6c5c-4c80-b603-055843663c2d.png)

#### 登入頁
![image](https://user-images.githubusercontent.com/100898369/228002266-a9672f3c-dfa3-4261-8202-e7095322004f.png)

#### 首頁
![image](https://user-images.githubusercontent.com/100898369/228001117-04d5ee28-08f8-45f6-9152-44db19c73f34.png)

#### 個人資料頁
![image](https://user-images.githubusercontent.com/100898369/228001165-07627bfa-6d10-46e7-94d4-43da51fff451.png)

#### 設定帳號頁面
![image](https://user-images.githubusercontent.com/100898369/228001532-067516cb-da85-4fc3-8013-1c7a396327c8.png)

#### 編輯個人資料頁
![image](https://user-images.githubusercontent.com/100898369/228002819-0c7cb387-4f2d-4739-9934-1e17d3735d92.png)

#### 發推文視窗
![image](https://user-images.githubusercontent.com/100898369/228002939-218107c3-bcb2-4002-8139-fa51daf0f32f.png)

#### 回復推文視窗
![image](https://user-images.githubusercontent.com/100898369/228003056-63e5058e-724f-4497-b180-8e498fdc703c.png)

#### 
### 功能列表
***
前台

- 使用者可以註冊、登入、登出，前台登入後即可使用twitter網站
- 可於主畫面瀏覽所有推文
- 點擊貼文方塊時，能查看貼文與回覆串
- 使用者能新增推文 (推文不能為空白)
- 使用者能回覆別人的推文 (無法回覆他人回覆)
- 點擊貼文中使用者頭像時，能瀏覽該使用者的個人資料及推文
- 使用者可以追蹤/取消追蹤其他使用者  (不能追蹤自己)
- 使用者能對別人的推文按 Like/Unlike (無法對他人的回覆按 Like/Unlike)
- 使用者能編輯自己的個人資料

後台

- 管理者可從專門的後台登入頁面進入網站後台
- 管理者可以瀏覽全站的 Tweet 清單，且可以在清單上直接刪除任何人的推文
- 管理者可以瀏覽站內所有的使用者清單，包括(推文數量、關注人數、跟隨者人數、推文被 like 的數量)



### Getting start
***
#### Prerequisites - 環境建置
1. [Node.js](https://nodejs.org/en/)
2. [npm](https://www.npmjs.com/)
3. [Nodemon](https://www.npmjs.com/package/nodemon)
4. [React](https://www.npmjs.com/package/react)


#### Installing - 安裝流程
1. 打開你的 terminal，Clone 此專案至本機電腦
          
           $ git clone https://github.com/Jasminechych/simple_twitter.git
    
2. 開啟終端機(Terminal)，進入存放此專案的資料夾

            $ cd simple_twitter 
    
3. 打開 VS code

            在 Terminal 輸入 $ code .
    
 即可開始編輯
 
4. 執行

        $ npm install
        
5. 在 Terminal 輸入 
                         
        $ npm start
    
6. 打開瀏覽器進入到以下網址：

           http://localhost:3000

7. 若要暫停

          按下ctrl+c
          
現在，你可開啟任一瀏覽器瀏覽器輸入 http://localhost:3000 開始使用simple twitter網站 ~

#### Built With - 使用工具
***
* [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) - 開發環境
* [Node.js](https://nodejs.org/en/) v16.18.1
* [React](https://www.npmjs.com/package/react) 18.2.0- 應用程式架構
* [react-router-dom](https://www.npmjs.com/package/react-router-dom) 6.4.1 
* [sass](https://www.npmjs.com/package/sass) v1.59.3
* [axios](https://www.npmjs.com/package/axios) v0.27.2
* [json-server](https://www.npmjs.com/package/json-server) 0.17.0

#### Contributor - 專案開發人員
***
[Jasmine](https://github.com/Jasminechych)

[Miki](https://github.com/kumomiki)
