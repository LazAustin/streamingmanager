const express = require('express');
const router = express.Router();
const {getPurchases, setPurchases, updatePurchases, deletePurchases} = require('../controllers/purchaseController');

router.route('/').get(getPurchases).post(setPurchases)

router.route('/:id').put(updatePurchases).delete(deletePurchases)

module.exports = router