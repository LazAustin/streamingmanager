const asyncHandler = require('express-async-handler')
const Purchase = require('../models/purchaseModel') //Purchase is nickname for JSON Array/Schema in purchaseModel.js



//Get purchases
//GET /api/purchases
//Private
//requests and responds/displays all purchases in db
const getPurchases = asyncHandler(async (req, res) => {
    const purchases = await Purchase.find()

    res.status(200).json(purchases)
})

//Set purchases
//GET /api/purchases
//Private
//Sends request to add completely new purchase and sends a json response with that added purchase 
const setPurchases = asyncHandler(async (req, res) => {
    
    const {title, year, producer, director, licenseStart, licenseEnd, platform, requestorName, requestorEmail, requestorDepartment, price, notes} = req.body
        
    if (!title || !year || !producer || !director || !licenseStart || !licenseEnd|| !platform || !requestorName || !requestorEmail || !requestorDepartment || !price || !notes){
        res.status(400)
        throw new Error('Please fill in all the fields')
    }

    const purchase = await Purchase.create(req.body
        //fields in the Purchase Model/JSON Array/Schema in models/purchaseModels.js
        //instantiates new Purchase
        
     /* title: req.body.title,
        year: req.body.year,
        producer: req.body.producer,
        director: req.body.director,
        licenseStart: req.body.licenseStart,
        licenseEnd: req.body.licenseEnd,
        platform: req.body.platform,
        requestorName: req.body.requestorName,
        requestorEmail: req.body.requestorEmail,
        requestorDepartment: req.body.requestorDepartment,
        price: req.body.price,
        notes: req.body.notes */
    )
    res.status(200).json(purchase) 
})

//Update purchases
//PUT /api/purchases/:id
//Private
//requests purchase of specific id, if there is one, updates specific property, and sends a json response with the modified property
const updatePurchases = asyncHandler(async (req, res) => {
    const purchase = await Purchase.findById(req.params.id)

    if (!purchase){
    res.status(400)
    throw new Error('Purchase not found')
    }

    const updatedPurchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    
    res.status(200).json(updatedPurchase)
})

//Delete purchases
//DELETE /api/purchases/:id
//Private
//sends request for purchase of specific id, if there is one, deletes it, and responds with a json array including just the id (for later UI purposes)
const deletePurchases = asyncHandler(async (req, res) => {
    const purchase = await Purchase.findById(req.params.id)

    if (!purchase) {
        res.status(400)
        throw new Error('Purchase not found')
    }

    await purchase.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getPurchases,
    setPurchases,
    updatePurchases,
    deletePurchases
}