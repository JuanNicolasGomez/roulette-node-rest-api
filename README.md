# roulette-node-rest-api

### Getting Started
1. Clonar el repositorio
2. Para ejecutar local ingresar en la terminal el siguiente comando: 

  `mpn run dev`
  
 El servicio queda corriendo en el puerto 3000
 
### Endpoints
**GET /api/roulettes/**

Body:

`[
    {
        "id": 1,
        "name": "roulette",
        "state": "closed",
        "winning_number": null,
        "winning_color": null,
        "bets": [
            {
                "type": "color",
                "value": "red",
                "amount": 0,
                "userId": 0,
                "payout": 0
            }
        ]
    },
    {
        "id": 2,
        "name": "roulette2",
        "state": "closed",
        "winning_number": null,
        "winning_color": null,
        "bets": [
            {
                "type": "number",
                "value": "0",
                "amount": 0,
                "userId": 1,
                "payout": 0
            }
        ]
    }
]`
# Arquitectura
