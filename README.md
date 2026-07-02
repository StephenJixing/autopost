# AutoPOST

一个可在手机上访问并发送 POST 请求的定时请求工具。

## 运行方式

### 本地运行
```bash
cd /Users/b/Documents/AutoPost
npm install
npm start
```

然后访问：
- http://127.0.0.1:3000/

### 部署到 Render
1. 把这个项目上传到 GitHub
2. 打开 https://render.com
3. 新建 Web Service
4. 连接你的 GitHub 仓库
5. 构建命令：`npm install`
6. 启动命令：`npm start`
7. 部署完成后，Render 会给你一个公网地址

## 说明
- 页面文件：autopost.html
- 服务端代理：server.js
- 代理地址：/proxy
