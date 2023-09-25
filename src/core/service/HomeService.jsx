import axios from "axios"

export const AllProducts = async (url, token) => {
    return await axios.get('https://cugusacompany.onrender.com/' + url, {
        headers: {
            "x-access-token": token
        }
    })
}

export const ChangeAvailability = async (url, token, id, changedValue) => {
    return await axios.patch('https://cugusacompany.onrender.com/' + url + id, changedValue, {
        headers: {
            "x-access-token": token
        }
    })
}

export const DeleteProduct = async (url, token, id) => {
    return await axios.delete('https://cugusacompany.onrender.com/' + url + id,{
        headers: {
            "x-access-token": token
        }
    })
}

export const UpdateProduct = async (url, token, productId, data) => {
    return await axios.patch('https://cugusacompany.onrender.com/' + url + productId, data, {
        headers: {
            "x-access-token": token
        }
    })
}