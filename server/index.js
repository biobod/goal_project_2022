const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const { sessionSecret } = require("./config/auth");
const authRoutes = require('./routes/auth.routes')
const {PORT, ORIGIN} = require('./constants')

const app = express();


app.use(cors({
    credentials: true,
    origin: ORIGIN
}));

app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
;
authRoutes(app)
