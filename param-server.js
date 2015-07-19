var express = require('express');
var app = express();

app.configure(function () {
    app.use(express.bodyParser());
});

app.get('/employee/getEmployee/:name', function (req, res) {
    res.type('application/json');
    var name = req.params.name;
    console.log("Parameter: " + name);

    employee = new Object();
    employee.name = name;
    employee.age = 25;
    employee.deparment = "HR";
    employee.wage = 15000.00;

    address = new Object();
    address.city = "Massachusetts";
    address.state = "Springfield";
    address.street = "Evergreen";
    address.zip = 66450;

    employee.address = address;

    res.json(employee);
});

app.post('/employee/postEmployee', function (req, res) {
    var employee = req.body;
    console.log("Got request: " + JSON.stringify(employee));
    res.send(employee);
});
app.listen(process.env.PORT || 9999);