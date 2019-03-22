let add = (task, req) => {
    task.push(req.body);
  return JSON.stringify(task, null, 4);
};

let del = (task, req) => {
    let find = task.find(el => el.plan === req.body.plan);
    task.splice(task.indexOf(find), 1);
    return JSON.stringify(task, null, 4);
};

let change = (task, req) => {
    let find = task.find(el => el.plan === req.params.id);
    find.priority = !req.body.priority;
    return JSON.stringify(task, null, 4);
};

module.exports = {
    add,
    del,
    change
};