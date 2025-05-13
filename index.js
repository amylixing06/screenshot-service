const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 80;

console.log('Node.js 服务已启动');
console.log('服务启动中，端口：', process.env.PORT || 80);

app.use(express.json());
app.use(cors());

app.post('/screenshot', async (req, res) => {
    try {
        const { url, width = 1920, height = 1080 } = req.body;
        
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--headless'
            ],
            executablePath: process.env.CHROME_BIN || null
        });
        
        const page = await browser.newPage();
        await page.setViewport({ width: parseInt(width), height: parseInt(height) });
        
        await page.goto(url, { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });
        
        const screenshot = await page.screenshot({
            type: 'png',
            fullPage: true
        });
        
        await browser.close();
        
        res.set('Content-Type', 'image/png');
        res.send(screenshot);
    } catch (error) {
        console.error('Screenshot error:', error);
        res.status(500).json({ error: 'Failed to capture screenshot', detail: error.message });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Screenshot service is running on port ${port}`);
}); 