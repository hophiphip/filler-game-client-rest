import { api } from '../config.js'; 

// TODO: Handle other http errors

export async function newGame(width, height) {
    console.debug("called POST: '/game'");

    try {
        const {data:response} = await axios({
            method: 'POST',
            url: api + '/game',
            withCredentials: false,
            headers: {
                'Accept' : 'application/json',
            },
            data: {
                'width': width,
                'height': height,
            }
        }).catch(function(error) {
            switch (error.response.status) {
                // Provided incorrect field size 
                case 400: {
                    console.log(error.response);
                    break;
                }
            }
            throw error;
        });

        return response;
    }
    catch(error) {
        console.log(error);
    }
}

export async function getGame(id) {
    console.debug("called GET: '/game/'" + id);
    
    try {
        const {data:response} = await axios({
            method: 'GET',
            url: api + '/game/' + id, 
            withCredentials: false,
            headers: {
                'Accept' : 'application/json',
            },
        }).catch(function(error) {
            switch (error.response.status) {
                // Incorrect request parameters
                case 400: {
                    console.log(error.response);
                    break;
                }

                // Incorrect game id
                case 404: {
                    console.log(error.response);
                    break;
                }
            }
            throw error;
        });

        return response;
    }
    catch(error) {
        console.log(error);
    }
}

export async function updateGame(game, color) {
    console.debug("called PUT: '/game/'" + game.id);

    try {
        const {data:response} = await axios({
            method: 'PUT',
            url: api + '/game/' + game.id,
            withCredentials: false,
            headers: {
                'Accept' : 'application/json',
            },
            data: {
                'playerId' : game.currentPlayerId,
                'color' : color,
            }
        }).catch(function(error) {
            switch (error.response.status) {
                // Incorrect request parameters
                case 400: {
                    console.log(error.response);
                    break;
                }
                
                // Provided player can't make a move right now
                case 403: {
                    console.log(error.response);
                    break;
                }

                // Provided player can't choose this color right now
                case 409: {
                    console.log(error.response);
                    break;
                }

                // Incorrect game id
                case 404: {
                    console.log(error.response);
                    break;
                }
            }
            throw error;
        });

        return response;
    } 
    catch(error) {
        console.log(error);
    }
}

