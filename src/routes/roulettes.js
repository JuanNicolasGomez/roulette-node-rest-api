const {Router} = require('express');
const router = Router();
const roulettes = require('../roulettes_mock.json');
console.log(roulettes)

router.get('/', (req,res) => {
    res.json(roulettes);
})

router.post('/', (req,res) => {
    if (isValidBody(req.body)){
        const newRoulette = buildRouletteBody(req.body);
        console.log(newRoulette);
        roulettes.push(newRoulette);
        res.json({
            "id":newRoulette.id
        });
    }else{
        res.status(500).json({error: "Wrong request"});
    }
    
})


function buildRouletteBody(body){
    const id = roulettes.length + 1;
    const state = 'closed';
    const newRoulette = {...body, id, state}
    return newRoulette;
}

function isValidBody(body){
    const {name} = body;
    return name;
}

module.exports = router;