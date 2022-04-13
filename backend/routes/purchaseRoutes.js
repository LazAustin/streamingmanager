const express = require('express');
const router = express.Router();
const {getPurchases, setPurchases, updatePurchases, deletePurchases} = require('../controllers/purchaseController');


//get, post, put, and delete functions brought in from controller folder for these endpoints
// the '/' is actually api/purchases and brought in at server.js
router.route('/').get(getPurchases).post(setPurchases)
router.route('/:id').put(updatePurchases).delete(deletePurchases)

module.exports = router