'use strict'

const db = require('../server/db')
const {User, Portfolio, Transaction} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const portfolio = await Promise.all([
    Portfolio.create({stock: 'A', quantity: '1', userId: '1'}),
    Portfolio.create({stock: 'AA', quantity: '2', userId: '2'})
  ])

  const transactions = await Promise.all([
    Transaction.create({
      stock: 'BBF',
      quantity: '1',
      price: '10.00',
      userId: '1'
    }),
    Transaction.create({
      stock: 'BBGI',
      quantity: '2',
      price: '10.00',
      userId: '2'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded portfolio ${portfolio.length} items`)
  console.log(`seeded ${transactions.length} transactions`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
