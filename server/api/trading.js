const router = require('express').Router()
const {Portfolio, Transaction} = require('../db/models')
const axios = require('axios')
module.exports = router

router.post('/user/:id/portfolio', async (req, res, next) => {
  try {
    const tradeDetails = req.body
    const currentStock = await Portfolio.findOne({
      where: {
        userId: req.params.id,
        stock: req.body.ticker
      }
    })

    let newQty = parseInt(req.body.qty)
    if (tradeDetails.transaction === 'buy') {
      if (currentStock) {
        newQty += currentStock.quantity
        const updated = await currentStock.update({quantity: newQty})
        res.json(updated)
      } else {
        const newStock = await Portfolio.create({
          userId: req.params.id,
          stock: req.body.ticker,
          quantity: newQty
        })
        res.json(newStock)
      }
    } else if (tradeDetails.transaction === 'sell') {
      console.log('newQty: ', newQty)
      if (currentStock) {
        newQty = currentStock.quantity - newQty
        if (newQty < 0) {
          res.json('You are selling more stocks than you have')
        } else if (newQty === 0) {
          const deletedStock = await currentStock.destroy()
          res.json(deletedStock)
        } else {
          const updated = await currentStock.update({quantity: newQty})
          res.json(updated)
        }
      } else {
        res.json('You dont own any of this stock!')
      }
    }
  } catch (err) {
    next(err)
  }
})
