const {Festival, Movie, sequelize} = require('../models/index')

class Controller {
    static postFestival(req, res) {
        try {
            let {festival_name, start, end} = req.body
            Festival.create({festival_name, start: new Date(start), end: new Date(end)})
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                res.sendStatus(400).send({ message: `Bad request` })
            })
        } catch (error) {
            res.status(500).send({ message: `Internal Server Error. ${error}` })
        }
    }

    static getFestivalFilm(req, res) {
        try {
            let {festival_name, start, end} = req.params
            Festival.findAll({festival_name, start: new Date(start), end: new Date(end)})
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                res.sendStatus(400).send({ message: `Bad request` })
            })
        } catch (error) {
            res.status(500).send({ message: `Internal Server Error. ${error}` })
        }
    }

    static getFestivalFilmDetail(req, res) {
        try {
            let {id} = req.params
            Festival.findByPk(id, {include: [{model: Movie, attributes: { exclude: ["createdAt", "updatedAt", "festival_id"]}}]})
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                res.sendStatus(400).send({ message: `Bad request` })
            })
        }
        catch (error) {
            res.status(500).send({ message: `Internal Server Error. ${error}` })
        }
    }

    static async getMovies(req, res) {
        try {
            let {name, year, start, end} = req.query
            if (!req.query?.start || !req.query?.end) {
                res.sendStatus(400).send({ message: `Bad request` })
            } else {
                let options = {start: new Date(start), end: new Date(end)}
            
                const movies = await Festival.findAll({where: options,attributes: { exclude: ["createdAt", "updatedAt"]}, include: [{model: Movie, attributes: { exclude: ["createdAt", "updatedAt", "festival_id"]}}]})
                res.send(movies)
            } 
        } catch (error) {
            res.status(500).send({ message: `Internal Server Error. ${error}` })
        }
    }

    static async deleteFestival(req, res) {
        try {
            let id = req.params.id
            const findFestival = await Festival.findByPk(id)
            if(findFestival) {
                Festival.destroy({where: {id}}).then(() => {
                    res.send({ message: `Festival with id ${id} has been deleted.` })
                }).catch(err => console.log(err))
            } else {
                res.sendStatus(400).send({ message: `Bad request` })
            }
        } catch (error) {
            res.sendStatus(500).send({ message: `Internal Server Error. ${error}` })
        }
    }

    static async deleteFilmFromFestival(req, res) {
        try {
            let id = req.params.id
            const findMovie = await Movie.update({festival_id: null}, {where: {id}})
            if(findMovie?.[0]) {
                res.send({ message: `Movie with id ${id} has been removed from festival.` })
            } else {
                res.sendStatus(400).send({ message: `Bad request` })
            }
        } catch (error) {
            res.sendStatus(500).send({ message: `Internal Server Error. ${error}` })
        }
    }

    static async postFilmToFestival (req, res) {
        try {
            let {festival_id, movie_id} = req.params
            const findFestival = await Movie.update({festival_id}, {where: {id: movie_id}})
            if (findFestival?.[0]) {
                res.send({ message: `Movie with id ${movie_id} has been added to festival with id ${festival_id}` })
            } else {
                res.sendStatus(400).send({ message: `Bad request` })
            }
        } catch (error) {
            res.sendStatus(500).send({ message: `Internal Server Error. ${error}` })
        }
    }
}

module.exports = Controller