由于作者在测试前端加解密案例的时候，可能因为扰动因素过多而导致没法理解autodecoder真正的操作流程，所以自己写了个简单的前后端加密，用来测试autodecoder的工作流程。

 案例是自己写的，使用了简单的AES加密，基本结构如下
 
 ![image](https://github.com/user-attachments/assets/d3ba47fe-4f5f-402e-83f9-d6425dbf9e5c)

autodecoder配置

![image](https://github.com/user-attachments/assets/e6387bc4-1ce8-497b-bf88-c680c0351622)

效果展示

注意：Request的autodecoder仅用来展示，重放还是需要修改原来的请求包（pretty或raw）
重放：发送的时候，需要修改原来的请求包，不能更改autodecoder

![image (1)](https://github.com/user-attachments/assets/192056b7-4790-4259-8345-663f270b26b9)

问题1：关于二次加密
经过测试，仅针对这个案例如果不加过滤，前端向后端发包的时候每次都会encode一遍。
解决办法，添加过滤关键字

![image (2)](https://github.com/user-attachments/assets/eeb4e0a5-d093-4d2f-b3ee-76419bc690c2)

所以需要通过关键词的方式来过滤，防止二次加密的产生。

![image (3)](https://github.com/user-attachments/assets/2bd72df9-6a3c-455f-b43d-f44b79409f81)


