const express = require('express');
const bodyParser = require('body-parser');
const CryptoJS = require('crypto-js');

const app = express();
const port = 3001;
const secretKey = 'your-secret-key'; // 应该与前端使用的密钥相同

// CORS中间件
const cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // 允许所有域名访问，也可以指定特定域名
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
};

app.use(cors); // 使用CORS中间件
app.use(bodyParser.text());

function decrypt(encryptedData, key) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

function encrypt(data, key) {
    return CryptoJS.AES.encrypt(data, key).toString();
}

app.post('/encrypted-data', (req, res) => {
    const encryptedData = req.body;
    const decryptedData = decrypt(encryptedData, secretKey);

    console.log('Received and decrypted data:', decryptedData);

    // 处理数据（这里简单地将其大写作为响应）
    const responseData = decryptedData.toUpperCase();

    const encryptedResponse = encrypt(responseData, secretKey);
    res.send(encryptedResponse);
});

app.listen(port, () => {
    console.log(`Server is running on http://172.21.144.1:${port}`);
});
