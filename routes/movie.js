const router = require('express').Router()
const ControllerMovie = require('../controllers/controller.js')

router.get('/', ControllerMovie.getMovies)
router.post('/:id', ControllerMovie.deleteFilmFromFestival)

module.exports = router

