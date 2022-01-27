const express = require('express');
const app = express();

const cors = require('cors');

const ctrl = require('./ctrl')


app.use(cors())
app.use(express.json())

app.post('/api/messages', ctrl.addMessage)

const port = 4004;
app.listen(port, () => console.log(`Server running on ${port}`))