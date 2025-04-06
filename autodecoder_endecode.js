var http = require('http'); // 引入http模块，用于创建HTTP服务器
const url = require('url'); // 引入url模块，用于解析请求的URL
const querystring = require('querystring'); // 引入querystring模块，用于解析URL编码的字符串
//var s = require('E:/ahxx2/hook/qm.js'); // 注释掉的代码，可能用于引入自定义模块
const fs = require('fs'); // 引入fs模块，用于文件系统操作（在此代码中未使用）
const CryptoJS = require('crypto-js');
const secretKey = 'your-secret-key';
const decrypt = require('./decrypt.js');
const encrypt = require('./encrypt.js');


// 创建HTTP服务器，并监听8888端口
http.createServer(function (req, res) {

  let path = url.parse(req.url); // 解析请求的URL，获取路径信息
  //console.log(path) // 注释掉的代码，用于打印路径信息

  let postparms = ''; // 初始化变量，用于存储POST请求的数据

  // 处理路径为'/encode'的请求
  if (path.pathname === '/encode') {

    console.log("encode路由"); // 打印路由信息

    // 监听'data'事件，每次处理一小部分请求数据
    req.on('data', (parms) => {

      postparms += parms; // 将接收到的数据片段累加到postparms变量中

    });
    // 监听'end'事件，表示数据接收完成
    req.on('end', () => {
      //console.log(postparms) // 注释掉的代码，用于打印接收到的POST数据
      // 使用querystring.parse方法解析URL编码的字符串
      postparms = querystring.parse(postparms);
      //console.log("接收到req的数据为", typeof postparms); // 打印解析后的数据类型
      // 提取dataBody字段，通常包含客户端发送的JSON数据
      let dataBody = postparms.dataBody;
      //let Data = sm4.encrypt(dataBody, key) // 注释掉的代码，可能用于加密数据
      console.log(dataBody); // 打印dataBody内容
      const encryptedData = encrypt.encrypt(dataBody, secretKey);
      // 将dataBody发送回客户端
      res.end(encryptedData);
    });

  } else if (path.pathname === '/decode') { // 处理路径为'/decode'的请求

    console.log("decode路由"); // 打印路由信息

    // 监听'data'事件，每次处理一小部分请求数据
    req.on('data', (parms) => {

      postparms += parms; // 将接收到的数据片段累加到postparms变量中

    });
    // 监听'end'事件，表示数据接收完成
    req.on('end', () => {
      // 使用querystring.parse方法将接收到的POST参数解析成一个对象
      postparms = querystring.parse(postparms);
      // 从解析后的POST参数中提取dataBody字段
      let dataBody = postparms.dataBody;
      
      console.log(dataBody); // 打印dataBody内容
      var responseBody = dataBody; // 将dataBody赋值给responseBody
      console.log("接收到decryptData的数据为", responseBody); // 打印响应体内容
      const decryptedResponse = decrypt.decrypt(responseBody, secretKey);
      console.log("返回的decryptData的数据为", decryptedResponse);

      // 将响应体发送回客户端，完成HTTP响应
      res.end(decryptedResponse);
      //console.log(a) // 注释掉的代码，可能用于打印某个变量a

    });

  } else { // 处理其他路径的请求

    res.write("end"); // 向客户端写入"end"
    res.end(); // 结束响应

  }

}).listen(8888); // 使服务器监听8888端口
