const fs = require('fs')
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.use('/api', require('./routes'))

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads')
}

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log(`Server has been started on port:${PORT}...`)
})
