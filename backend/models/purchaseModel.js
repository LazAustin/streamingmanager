const mongoose = require('mongoose');

const purchaseSchema = mongoose.Schema({

/*  For testing purposes on Postman
    text: {
        type: String,
        required: [true, 'Please add a text value'],
    }, 
*/

    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    year: {
        type: Number,
        unique: false,
        required: [true, 'Please add a year of release'],
        min: 1900,
        max: new Date().getFullYear()
    },
    producer: {
        type: String,
        unique: false,
        required: [true, 'Please add a production company'],
    },
    director: {
        type: String,
        unique: false,
        required: false,
    },
    licenseStart: {
        type: Date,
        unique: false,
        required: [true, 'Please enter the date the license starts'],
    },
    licenseEnd: {
        type: Date,
        unique: false,
        required: [true, 'Please enter the date the license ends'],
    },
    platform: {
        type: String,
        unique: false,
        required: [true, 'Please enter the platform'],
    },
    requestorName: {
        type: String,
        unique: false,
        required: [true, 'Please enter the faculty or staff member who requested this purchase'],
    },
    requestorEmail: {
        type: String,
        unique: true,
        required: [true, 'Please enter the requestor email'],
    },
    requestorDepartment: {
        type: String,
        unique: false,
        required: [true, 'Please enter the requestor department'],
    },
    price: {
        type: Number,
        unique: false,
        required: [true, 'Please enter the price'],
        min: 0
    },
    notes: {
        type: String,
        unique: false,
        required: false,
    },
},
     { timestamp: true })

module.exports = mongoose.model('Purchase', purchaseSchema)