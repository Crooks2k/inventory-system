import axios from "axios"

export const AllProducts = async (url, token)=> {
    return await axios.get('https://cugusacompany.onrender.com/' + url, {
        headers: {
            "x-access-token": token
        }
    })
}