const {Router} = require('express');
const router = Router();
const roulettes = require('../dataMock.json');
console.log(roulettes)

router.get('/', (req,res) => {
    res.json(roulettes);
})

router.post('/', (req,res) => {
    const {name} = req.body;
    if (name){
        const id = roulettes.length + 1;
        const newRoulette = {...req.body, id}
        roulettes.push(newRoulette);
        res.json({
            "id":id.toString()
        });
    }else{
        res.send(`Wrong request`);
    }
    
})

module.exports = router;