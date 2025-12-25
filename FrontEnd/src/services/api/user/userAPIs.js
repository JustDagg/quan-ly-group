import axios from "axios"

import fetcher from "../../fetcher"

export const signin = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8888/api' + '/auth/signin', {
            username: username,
            password: password
        })
        console.log(response)
        return { success: true, data: response.data }
    } catch (err) {
        console.log(err)
        return { success: false, error: err.response.data }
    }
}

export const getInfo = async username => {
    await fetcher.get('/accounts', {
        params: {
            username: username
        }
    })
}