const {Router} = require('express');
const router = Router();
const roulettes = require('../roulettes_mock.json');


router.get('/', (req,res) => {
    res.json(roulettes);
})

router.post('/', (req,res) => {
    if (isValidBody(req.body)){
        const newRoulette = buildRouletteBody(req.body);
        roulettes.push(newRoulette);
        res.json({
            "id":newRoulette.id
        });
    }else{
        res.status(500).json({error: "Wrong request"});
    }
    
})

router.patch('/:id', (req,res) => {
    const {id} = req.params;
    if (openRoulette(id)){
        res.json({"id": id, "desc":"Roulette with id " + id + " opened succesfully."})
    }
    else{
        res.status(500).json({error: "Roullette could not be opened"});
    }
})


function buildRouletteBody(body){
    const id = roulettes.length + 1;
    const state = 'closed';
    const newRoulette = {...body, id, state}
    return newRoulette;
}

function openRoulette(id){
    var state = false;
    roulettes.forEach(roulette => {
        if (roulette.id == id && roulette.state == 'closed'){
            roulette.state = 'open'
            state =  true;
        }
        console.log(roulette)
    });
    return state;
}

function isValidBody(body){
    const {name} = body;
    return name;
}

module.exports = router;