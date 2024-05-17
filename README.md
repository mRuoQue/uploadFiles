### DOC

#### 由于服务器到期，项目中未将数据存储在数据库中，使用了本地文件夹存储数据，读取文件流包装成 JSON

#### 如需连接数据库，只需要加一层 schema

- 本项目主要实现了两个功能：
- 1. 文件上传
-       1.1 单文件上传
-       1.2 多文件上传
-       1.3 拖拽上传

```javascript
    npm init
    npm install
    npm run dev // 启动前端项目
    npm run serve // 启动服务端项目

```


- 2. 在线项目回滚(无 docker 时候回滚方式，)
-   2.1 项目发生异常回滚，本地起一个服务，可以借助serve
-   2.2 客户端路由到/sourceMap查看当前打包后的资源文件
-   2.3 服务端读取资源文件（模拟数据库），重写执行回滚的文件
-   2.4 切换到serve -s dist 服务下刷新即可看到回滚状态

```javascript
    npm run dev // 启动前端项目
    npm run serve // 启动服务端
    
     // 如果没有安装serve
     npm install serve -g
     cd ./{project}
     serve -s dist // 

```




---  前端资源目录       /src

---  服务端资源目录     /server

---  文件上传目录      /update

---  数据保存目录      /history

---  打包后的文件      /dist

:blush:  ** 只是提供一种思路，实际开发中需要和工程化结合，包括错误日志处理等等，有空了完善
