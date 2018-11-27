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
