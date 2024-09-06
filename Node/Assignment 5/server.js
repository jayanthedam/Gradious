const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

app.use(express.static('./public'));

app.get('/buddylist', (req, res) => {
    fs.readFile('./data/buddylist.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.status(200).json(JSON.parse(data));
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
