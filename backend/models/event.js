let mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    eventName: {
        type: String,
        required: [true, 'event name is required']
    },
    location: {
        type: String,
        required: [true, 'location is required']
    },
    members: {
        type: Number,
        required: [true, 'members is required']
    },
    detail: {
        type: String,
        required: [true, 'detail is required']
    },
    date: {
        type: Date,
        required: [true, 'date is required']
    },
    time: {
        type: Date,
        required: [true, 'time is required']
    },
})

module.exports = mongoose.model('event', eventSchema)