const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/screenshot', async (req, res) => {
    try {
        const { url, width = 1920, height = 1080 } = req.body;
        
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        await page.setViewport({ width: parseInt(width), height: parseInt(height) });
        
        await page.goto(url, { waitUntil: 'networkidle0' });
        
        const screenshot = await page.screenshot({
            type: 'png',
            fullPage: true
        });
        
        await browser.close();
        
        res.set('Content-Type', 'image/png');
        res.send(screenshot);
    } catch (error) {
        console.error('Screenshot error:', error);
        res.status(500).json({ error: 'Failed to capture screenshot' });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(port, () => {
    console.log(`Screenshot service is running on port ${port}`);
}); 