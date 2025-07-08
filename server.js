const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const users = [
    { username: 'admin', password: 'password' },
    { username: 'user', password: '123456' },
    { username: 'demo', password: 'demo' }
];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ 
            message: 'ユーザー名とパスワードが必要です' 
        });
    }
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.json({ 
            message: 'ログイン成功',
            username: user.username
        });
    } else {
        res.status(401).json({ 
            message: 'ユーザー名またはパスワードが正しくありません' 
        });
    }
});

app.get('/health', (req, res) => {
    // ALB用のより詳細なヘルスチェック
    const healthData = {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        pid: process.pid,
        memory: process.memoryUsage()
    };
    
    res.status(200).json(healthData);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to access the application`);
});