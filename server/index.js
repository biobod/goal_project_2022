const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const {PORT, ORIGIN} = require('../common/serverConstants')

const app = express();


app.use(cors({
    credentials: true,
    origin: ORIGIN
}));

app.use(cookieParser())


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
});

authRoutes(app)
