const router = require('express').Router()
module.exports = router;
const Location =  require('../../../db/models/location.js')

router.get('/', (req, res, next) => {
    console.log('Retriving All Location')
    Location.findAll()
        .then( Locations => {
            res.send(Locations)
        })
        .catch(next)
})

router.get('/ping/:longitude/:latitude', (req, res, next) => {

    console.log('Longitude',req.params.longitude,'Latitude',req.params.latitude)

    res.send(req.params.longitude, req.params.latitude)

    // Location.findAll()
    //     .then( Locations => {
    //         res.send(Locations)
    //     })
    //     .catch(next)
})

router.get('/:id', (req, res, next) => {
    console.log('Retriving drawing number #{req.params.id}')
    Location.findById(req.params.id)
        .then( Location => {
            res.send(Location)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    console.log('Creating new location')
    let newLocation = req.body
    Location.create(newLocation)
        .then( location => {
            res.send(location)
        })
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    console.log('Destoying location #{req.params.id}')
    Location.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((res, next) => {
            res.status(204).send('')
        })
        .catch(next)

})

router.put('/:id', ( req, res, next ) => {
    let updatedLocation = req.body
    Location.update(updatedLocation, {
        where: {
            id: req.params.id
        }
    })
        .then(location => {
            res.send(location)
        })
        .catch(next)

})
