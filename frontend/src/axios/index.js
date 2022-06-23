import axios from 'axios'

export const methods = {
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    GET: "GET",
}

export const emsAxios = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
})

export default async function fetch(api, method, config) {
    const token = window.localStorage.getItem("token")
    const headers = { 'token': token }

    switch (method) {
        case methods.POST: {
            return await emsAxios.post(api, config?.body, { headers })
        }

        case methods.PUT: {
            return await emsAxios.put(api, config?.body, { headers })
        }

        case methods.DELETE: {
            return await emsAxios.delete(api, { headers })
        }

        case methods.GET: {
            return await emsAxios.get(api, { headers, params: config?.params })
        }

        default: {
            return await emsAxios.get(api, { headers, params: config?.params })
        }
    }
}