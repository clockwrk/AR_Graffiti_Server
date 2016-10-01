const router = require('express').Router()
module.exports = router;
const Drawing =  require('../../../db/models/drawing.js')

router.get('/', (req, res, next) => {
    console.log('Retriving All Drawings')
    Drawing.findAll()
        .then( Drawings => {
            res.send(Drawings)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    console.log('Retriving drawing number #{req.params.id}')
    Drawing.findById(req.params.id)
        .then( Drawing => {
            res.send(Drawing)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    console.log('Creating new drawing')
    let newDrawing = req.body
    Drawing.create(newDrawing)
        .then( drawing => {
            res.send(drawing)
        })
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    console.log('Destoying drawing #{req.params.id}')
    Drawing.destroy({
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
    let updatedDrawing = req.body
    Drawing.update(updatedDrawing, {
        where: {
            id: req.params.id
        }
    })
        .then(drawing => {
            res.send(drawing)
        })
        .catch(next)

})


