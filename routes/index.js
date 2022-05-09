const router = require('express').Router()
const movie = require('./movie.js')
const festival = require('./festival.js')

router.use('/api/movies', movie)
router.use('/api/festival', festival)

module.exports = router