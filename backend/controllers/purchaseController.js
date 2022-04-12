const asyncHandler = require('express-async-handler')
const Purchase = require('../models/purchaseModel')



//Get purchases
//GET /api/purchases
//Private
const getPurchases = asyncHandler(async (req, res) => {
    const purchases = await Purchase.find()

    res.status(200).json(purchases)
})

//Set purchases
//GET /api/purchases
//Private
const setPurchases = asyncHandler(async (req, res) => {
    if (!req.body){
    res.status(400)
    throw new Error('Please fill in all the fields')
    }
    const purchase = await Purchase.create({
        title: req.body.title,
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
        notes: req.body.notes
    })
    res.status(200).json(purchase)
})

//Update purchases
//PUT /api/purchases/:id
//Private
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