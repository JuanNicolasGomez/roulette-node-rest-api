const {Router} = require('express');
const router = Router();
const roulettes = require('../dataMock.json');
console.log(roulettes)

router.get('/', (req,res) => {
    res.json(roulettes);
})

module.exports = router;