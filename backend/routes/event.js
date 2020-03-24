const express = require('express');
const router = express.Router();

//Bring event Model
let Event = require('../models/event');

// add event
router.post('/', (req, res) => {
    var result = {
        message: '',
        data: {},
        status: false,
        error: {},
    }
    let event = new Event(req.body)
    console.log(event)
    event.save()
        .then(event => {
            result.message = 'event saved'
            result.status = true
            result.data = event
            res.json(result)
        }).catch(err => {
            result.message = "error"
            result.error = err
            res.status(422).json(result)
        })
})

//get all events
router.get('/', (req, res) => {
    var result = {
        message: '',
        data: {},
        status: false,
        error: {},
    }
    Event.find({})
        .then(event => {
            result.message = "event list"
            result.status = true
            result.data = { event }
            res.json(result)
        }).catch(err => {
            result.message = 'error'
            result.error = err
            res.status(422).json(result)
        })
})

//get event by Id
router.get('/:id', (req, res) => {
    var result = {
        message: '',
        data: {},
        status: false,
        error: {},
    }
    Event.find({ _id: req.params.id })
        .then(event => {
            result.message = "event get by" + req.params.id
            result.status = true
            result.data = { event }
            res.json(result)
        }).catch(err => {
            result.message = 'error'
            result.error = err
            res.status(422).json(result)
        })
})

//update event
router.put('/:id', (req, res) => {
    var result = {
        message: '',
        data: {},
        status: false,
        error: {},
    }
    Event.updateOne({ _id: req.params.id }, { ...req.body })
        .then(() => {
            result.message = 'event updated'
            result.status = true
            res.json(result)
        }).catch(err => {
            result.message = 'error'
            result.error = err
            res.status(422).json(result)
        })
})

//delete event
router.delete('/:id', (req, res) => {
    var result = {
        message: '',
        data: {},
        status: false,
        error: {},
    }
    Event.deleteOne({ _id: req.params.id })
        .then(() => {
            result.message = 'event deleted'
            result.status = true
            res.json(result)
        }).catch(err => {
            console.log(err)
            result.message = 'error'
            result.error = err
            res.status(422).json(result)
        })
})

module.exports = router;