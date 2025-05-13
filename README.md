# Screenshot Service

一个基于 Express 和 Puppeteer 的网页截图服务。

## 功能特点

- 支持自定义截图尺寸
- 支持全页面截图
- 健康检查接口
- 简单易用的 API

## 安装

```bash
npm install
```

## 运行

```bash
npm start
```

## API 使用说明

### 截图接口

**POST** `/screenshot`

请求体：
```json
{
    "url": "https://example.com",
    "width": 1920,  // 可选，默认 1920
    "height": 1080  // 可选，默认 1080
}
```

响应：
- 成功：返回 PNG 格式的图片
- 失败：返回 JSON 格式的错误信息

### 健康检查

**GET** `/health`

响应：
```json
{
    "status": "ok"
}
```

## 环境变量

- `PORT`: 服务端口号（默认：3000）

## 部署

本项目可以部署在任何支持 Node.js 的平台上，如 Zeabur、Vercel、Heroku 等。 