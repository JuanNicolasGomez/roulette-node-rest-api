const {Router} = require('express');
const router = Router();
const roulettes = require('../roulettes_mock.json');


router.get('/', (req,res) => {
    res.json(roulettes);
})

router.post('/', (req,res) => {
    if (isValidRouletteBody(req.body)){
        const newRoulette = buildRoulette(req.body);
        roulettes.push(newRoulette);
        res.json({
            "id":newRoulette.id
        });
    }else{
        res.status(500).json({error: "Wrong request"});
    }
    
})

router.patch('/open/:id', (req,res) => {
    const {id} = req.params;
    if (openRoulette(id)){
        res.json({"id": id, "desc":"Roulette with id " + id + " opened succesfully."})
    }
    else{
        res.status(500).json({error: "Roullette does not exists or it's already opened"});
    }
})

router.post('/bet/:id', (req,res) => {
    const {id} = req.params;
    if (isValidBetBody(req.body)){
        const newBet = buildBet(req.body);
        if (createBet(id, newBet)){
            res.json({"id": id, "desc":"Bet created succesfully."})
        }else{
            res.status(500).json({error: "Roullette does not exists or it's closed"});
        }
    }else{
        res.status(500).json({error: "Wrong request"});
    }
})


function buildRoulette(body){
    const id = roulettes.length + 1;
    const state = 'closed';
    const bets = [];
    const newRoulette = {...body, id, state, bets}
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

function isValidRouletteBody(body){
    const {name} = body;
    return name;
}

function isValidBetBody(body){
    const {type, value, amount} = body;
    return isValidBetType(type) && isValidBetValue(type, value) && isValidBetAmount(amount);
}

function isValidBetType(type){
    var types = ["number", "color"];
    return types.includes(type);
}

function isValidBetValue(type, value){
    var colors = ["red","black"];
    if (type == "number"){
        return (parseInt(value) >= 0) && (parseInt(value) <= 36);
    }else if (type == "color"){
        return colors.includes(value);
    }
}

function isValidBetAmount(amount){
    return (amount > 0) && (amount <= 10000);
}
function buildBet(body){
    const id = roulettes.length + 1;
    const newRoulette = {...body, id}
    return newRoulette;
}

function createBet(id, bet){
    var state = false;
    roulettes.forEach(roulette => {
        if (roulette.id == id && roulette.state == 'open'){
            roulette["bets"].push(bet);
            state =  true;
        }
        console.log(roulette)
    });
    return state;
    
}
module.exports = router;