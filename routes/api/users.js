const express = require('express')
const router = express.Router()

// @route   POST api/users
// @desc    Regisiter user
// @access  Public
router.post('/', (req, res) => {
  console.log(req.body)
  res.send('Regisiter user')
})

module.exports = router