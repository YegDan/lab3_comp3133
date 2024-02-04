const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    cuisine:{
        type: String,
        lowercase: true,
    },
    city:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    }
});
restaurantSchema.query.byCuisine = function(cuisine){
    return this.where({cuisine: new RegExp(cuisine, 'i')})
}
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;