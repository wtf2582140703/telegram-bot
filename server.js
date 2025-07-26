const express = require('express');
const fetch = require('node-fetch');
const multer = require('multer');
const fs = require('fs');
const FormData = require('form-data');

const app = express();

// 设置文件上传存储
const upload = multer({ dest: 'uploads/' });

const botToken = '7595239940:AAHPbsRXULKhxNIxcd1k4AtDSCsgImXvn34';  // 替换为你从 BotFather 获得的 token
const chatId = '-1002644840253';      // 替换为你的 Telegram 聊天 ID
const telegramAPI = `https://api.telegram.org/bot${botToken}/`;

// 处理上传的图片并发送到 Telegram
app.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file;
  if (file) {
    const form = new FormData();
    form.append('photo', fs.createReadStream(file.path));

    const response = await fetch(`${telegramAPI}sendPhoto?chat_id=${chatId}`, {
      method: 'POST',
      body: form,
    });

    const data = await response.json();
    res.json(data); // 返回 Telegram API 的响应
  } else {
    res.status(400).send('No file uploaded.');
  }
});

// 启动 Express 服务器
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
