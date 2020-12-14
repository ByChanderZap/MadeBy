const boom = require('@hapi/boom');
const fetch = require('node-fetch');
const { config } = require('../../config/index');


const getAccessToken = async (client_id, client_secret, code, state) => {
    try {
        const response = await fetch(config.github_access_token_url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                client_id,
                client_secret,
                code,
                state
            })    
        })
        const data = await response.text();
        const params = new URLSearchParams(data);
        return params.get('access_token');
    } catch (error) {
        console.error(error);
        boom.badRequest(error.message);
    }
}

const getUserData = async (accessToken) => {
    try {
        const response = await fetch(config.github_user_data_url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${accessToken}`
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        throw boom.conflict()
    }
}

module.exports = {
    getAccessToken,
    getUserData
}