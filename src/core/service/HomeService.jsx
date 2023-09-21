import axios from "axios"

export const AllProducts = (url, authToken) => {
    return axios.get('https://cugusacompany.onrender.com' + url, {
        headers: {
            'Authorization': `Bearer${authToken}`,
            'Content-Type': 'application/json'
        }
    })
}