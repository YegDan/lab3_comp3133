const express = require('express');
const app = express();
const restModel = require('../models/Restaurant');


app.post('/restaurants', (req, res) => {
    const rest = new restModel({
        name: req.body.name,
        cuisine: req.body.cuisine,
        city: req.body.city,
        rating: req.body.rating
    });
    rest.save().then(result => {
        res.send(result);
    }).catch(err => {
        res.status(500).send(err);
    });
});
// app.get("/restaurants", (req, res) => {
//     const restaurants = restModel.find().then(result => {
//         res.send(result);
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// })
//get res by cuisine
app.get('/restaurants/cuisine/:cuisine', (req, res) => {
    const restaurants = restModel.find().byCuisine(req.params.cuisine).then(result => {
        res.send(result)})
        .catch(err => {res.status(500).send(err);});
    }
)

//read all based on id in asc or desc order
//http://localhost:3000/restaurants?sortBy=ASC OR DESC
//cuisines, name, city, resturant_id
app.get('/restaurants', (req, res)=>{
    const sortBy = req.query.sortBy;
    let sortParam = sortBy === 'ASC' ? {_id: 1} : {_id: -1};
    console.log('Sorting by:', sortBy, 'with sortParam:', sortParam);
    restModel.find({}).select("_id name city cuisine").sort(sortParam).then(result => {
        res.send(result);
    }).catch(err => {res.status(500).send(err);});
})

app.get('/restaurants/Delicatessen', (req, res) => {
    const restuarants = restModel.find({})
        .select("name cuisine city")
        .where('cuisine').equals('Delicatessen')
        .where('city').ne('Brooklyn')
        .sort({name: 1})
        .then(result=>{
        res.send(result)})
        .catch(err => res.status(500).send(err))
    
})
module.exports = app;