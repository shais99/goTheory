const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()
const http = require('http').createServer(app);

// Express App Config
app.use(cookieParser())
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(session({
    secret: 'MyS@CR@TC0dE001190899100ItsoNlyMiNE',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

const examRoutes = require('./api/exam/exam.routes')
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const emailRoutes = require('./api/email/email.routes')
const msgRoutes = require('./api/msg/msg.routes')


app.use('/api/exams', examRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/emails', emailRoutes)
app.use('/api/msgs', msgRoutes)


const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});