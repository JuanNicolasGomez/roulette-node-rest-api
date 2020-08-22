# roulette-node-rest-api

### Getting Started
1. Clonar el repositorio
2. Para ejecutar local ingresar en la terminal el siguiente comando: 

  `mpn run dev`
  
 El servicio queda corriendo en el puerto 3000
 
### Roulette attributes
`id` : Id de la ruleta,

`name`: Nombre de la ruleta,

`state`: Estado de la ruleta (`open`, `closed`)

`winning_number`: Numero sacado por la ruleta

`winning_color`: Color sacado por la ruleta

`bets`: Lista de apuestas en esa ruleta

       `type`: Tipo de apuesta (`number`, `color`)
       
       `value`: Color o número a apostar (`red`, `black`, `0`, `20`, `36` ....)
       
       `amount`: Cantidad de dinero a apostar max. 10000
       
       `payout`: Cantidad de dinero ganada al cerrar la ruleta
       

### Endpoints
**GET /api/roulettes/** obtiene la lista de ruletas creadas

Response Body:

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

**POST /api/roulettes/** Crea una nueva ruleta dado el nombre

Request Body:
`{"name":"Ruleta 1"}`

Response Body:

`{
    "id": 3
}`

**PATCH /api/roulettes/open/{id}** Abre apuestas para la ruleta del id especificado

Response Body:

`{
    "id": "3",
    "desc": "Roulette with id 3 opened succesfully."
}`

**POST /api/roulettes/bet/{id}**

Request Body:

`{
    "type": "color",
    "value": "red",
    "amount":5000
}`


`{
    "type": "number",
    "value": "22",
    "amount":5000
}`

Response Body:

{
    "id": "1",
    "desc": "Bet created succesfully."
}

**PATCH /api/roulettes/close/{id}** Cierra apuestas para la ruleta del id especificado y devuelve el resultado de las apuestas

Response Body
`{
    "id": 1,
    "name": "roulette",
    "state": "closed",
    "winning_number": 23,
    "winning_color": "red",
    "bets": [
        {
            "type": "color",
            "value": "red",
            "amount": 0,
            "payout": 0
        },
        {
            "type": "color",
            "value": "black",
            "amount": 5000,
            "payout": 0
        },
        {
            "type": "color",
            "value": "red",
            "amount": 5000,
            "payout": 10000
        }
    ]
}`
