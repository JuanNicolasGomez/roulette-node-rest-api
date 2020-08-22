const {Router} = require('express');
const router = Router();
const roulettes = require('../roulettes_mock.json');
const colors = ["red","black"];
const types = ["number", "color"];


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
        res.json({"id": id, "desc":"Roulette with id " + id + " opened succesfully."});
    }
    else{
        res.status(500).json({error: "Roullette does not exists or it's already opened"});
    }
})

router.patch('/close/:id', (req,res) => {
    const {id} = req.params;
    var result = closeRoulette(id);
    if (result){
        res.json(result);
    }
    else{
        res.status(500).json({error: "Roullette does not exists or it's already closed"});
    }
})

router.post('/bet/:id', (req,res) => {
    console.log(req.headers["user-id"]);
    if(req.headers["user-id"] == null){
        res.status(403).send({error: "User not authenticated"});
    }
    const {id} = req.params;
    if (isValidBetBody(req.body)){
        const newBet = buildBet(req.body);
        if (createBet(id, newBet)){
            res.json({"id": id, "desc":"Bet created succesfully."});
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
    const winning_number = null;
    const winning_color = null;
    const bets = [];
    const newRoulette = {...body, id, state, bets}
    return newRoulette;
}

function openRoulette(id){
    var state = false;
    roulettes.forEach(roulette => {
        if (roulette.id == id && roulette.state == 'closed'){
            roulette.state = 'open';
            state =  true;
        }
    });
    return state;
}

function closeRoulette(id){
    var rouletteResult = null;
    roulettes.forEach(roulette => {
        if (roulette.id == id && roulette.state == 'open'){
            rouletteResult = generateRouletteResult(roulette)
            roulette.state = 'closed';
            state =  true;
        }
    });
    return rouletteResult;
}

function generateRouletteResult(roulette){
    var number = Math.floor(Math.random() * 37); 
    var color = colors[Math.floor(Math.random() * colors.length)];
    roulette.winning_number = number;
    roulette.winning_color = color;
    roulette["bets"].forEach(bet => {
        if (bet.type == "color" && bet.value == color){
            bet.payout = bet.amount * 2;
        }else if(bet.type == "number" && bet.value == number){
            bet.payout = bet.amount * 36;
        }
    });
    return roulette;
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
    return types.includes(type);
}

function isValidBetValue(type, value){
    if (type == types[0]){
        return (parseInt(value) >= 0) && (parseInt(value) <= 36);
    }else if (type == types[1]){
        return colors.includes(value);
    }
}

function isValidBetAmount(amount){
    return (amount > 0) && (amount <= 10000);
}
function buildBet(body){
    const payout = 0;
    const newBet = {...body, payout}
    return newBet;
}

function createBet(id, bet){
    var state = false;
    roulettes.forEach(roulette => {
        if (roulette.id == id && roulette.state == 'open'){
            roulette["bets"].push(bet);
            state =  true;
        }
    });
    return state;
    
}
module.exports = router;