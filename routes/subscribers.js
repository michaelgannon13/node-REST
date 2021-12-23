const express = require('express');
const subscriber = require('../models/subscriber');
const router = express.Router(); // for CRUD actions
const Subscriber = require('../models/subscriber')

// Route for GET all
router.get('/', async (req, res) => { // router needs request, response & route to GET all
    try {
        const subscribers = await Subscriber.find(); // waits for all subscribes to be returned
        res.json(subscribers); // return in json format
    } catch (err) {
        res.status({ message: err.message });
    }
})

// Route for GET one
router.get('/:id', getSubscriber, (req, res) => { // router needs request, response & route to GET one
    res.send(res.subscriber);
})

// Route for CREATE one
router.post('/', async (req, res)=> { // CREATE on general route
    const subscriber = new Subscriber({ // create new subscriber object
        name: req.body.name, // post is requested by user with name in req body
        subscribedToChannel: req.body.subscribedToChannel,
        subscribedToDate: req.body.subscribedToDate
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
})

// Route for UPDATE one
router.patch('/:id', getSubscriber, async (req, res)=> { // PATCH only updates part of entry using info it's passed. PUT updates whole entry
    if(req.body.name != null) {
        res.subscriber.name = req.body.name
    }

    if(req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
})

// Route for DELETE one
router.delete('/:id', getSubscriber, async (req, res)=>{
    try {
        await res.subscriber.remove(); // remove from DB
        res.json({ message: 'Deleted Subscriber' }) 
    } catch (err){
        res.status(500).json({ message: err.message })
    }

})

// MIDDLEWARE
async function getSubscriber(req, res, next) { // Middleware function. It's async because it will access DB on server and may be waiting/not get a response  
    let subscriber
    try {                                      
        subscriber = await Subscriber.findById(req.params.id); // next means move onto the callback (delete/patch/get(id)) after getSubscriber is complete
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (err){
        return res.status(500).json({ message: err.message }) // returning server error message to user
    }
    res.subscriber = subscriber; // creating a subscriber var on response that's equal to our subscriber thats been found
    next();
}

module.exports = router; // exporting router
