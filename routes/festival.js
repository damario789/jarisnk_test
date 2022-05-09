const router = require('express').Router()
const Controller = require('../controllers/controller.js')

router.get('/', Controller.getFestivalFilm)
router.post('/create', Controller.postFestival)
router.post('/:festival_id/add/:movie_id', Controller.postFilmToFestival)
router.get('/:id', Controller.getFestivalFilmDetail)
router.delete('/:id', Controller.deleteFestival)

module.exports = router

