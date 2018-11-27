const router = require('express').Router()
const {User, Portfolio, Transaction} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/portfolio', async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findAll({
      where: {
        userId: req.params.id
      }
    })
    res.json(portfolio)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/transactions', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        userId: req.params.id
      }
    })
    res.json(transactions)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/account', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user.accountBalance)
  } catch (err) {
    next(err)
  }
})
