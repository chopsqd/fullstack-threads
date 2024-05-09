const express = require('express');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.use('/api', require('./routes'))

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log(`Server has been started on port:${PORT}...`)
})
