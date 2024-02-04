const express = require('express');
const mongoose = require('mongoose');
const restRouter = require('./routes/resRouter');
const app = express();
const port = 8080;
const uri = "mongodb+srv://rootadmin:rootadmin@cluster0.fpg8zxl.mongodb.net/"

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(success => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error: ', err);
});

app.use(express.json());
app.use(restRouter);
// app.get('/api', (req, res) => {
//     res.send('Comp3133 Lab3');
// });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});