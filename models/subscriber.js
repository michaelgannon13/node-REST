const mongoose = require('mongoose'); // for creating model

const subscribersSchema = new mongoose.Schema({ // mongoose schema
    name: { // key values. Values are objects
        type: String, // name is a string
        required: true // name is always required
    },
    subscribedToChannel: {
        type: String, // name is a string
        required: true // name is always required
    },
    subscribedToDate:  {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Subscriber', subscribersSchema); // subscribersSchema corresponds to db schema called Subscriber
                                                                  