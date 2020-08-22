const {Router} = require('express');
const router = Router();
const roulettes = require('../roulettes_mock.json');
console.log(roulettes)

router.get('/', (req,res) => {
    res.json(roulettes);
})

router.post('/', (req,res) => {
    const {name} = req.body;
    if (name){
        const id = roulettes.length + 1;
        const state = 'closed';
        const newRoulette = {...req.body, id, state}
        roulettes.push(newRoulette);
        res.json({
            "id":id.toString()
        });
    }else{
        res.status(500).json({error: "Wrong request"});
    }
    
})

module.exports = router;