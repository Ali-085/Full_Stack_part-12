const express = require('express')
const router = express.Router()
const { getAsync } = require('../redis/index')

router.get('/statistics', async (req, res) => {
  const added = await getAsync("added_todos")
  res.json({ added_todos: Number(added) || 0 })
})

module.exports = router
