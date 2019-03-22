const task = require('./task');
const fs = require('fs');

const actions = {
    add: task.add,
    del: task.del,
    change: task.change
};

let handler = (req, res, action, file, wfile = file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            let newCart = actions[action](JSON.parse(data), req);
            console.log(newCart);
            fs.writeFile(file, newCart, (err) => {
                if(err){
                    res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    })
};

module.exports = handler;
