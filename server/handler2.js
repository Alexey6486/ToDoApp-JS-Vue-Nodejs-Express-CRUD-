const fs = require('fs');

let uphandler = (req, res, file, wfile = file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data)
        }
    })
};

module.exports = uphandler;