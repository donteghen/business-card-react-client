import axios from "axios";


const baseUrl = process.env.REACT_APP_API_BASE_URL

// create a new delivery 
export const createDelivery = async (detail) => {
    try {
        const res = await axios.get(`${baseUrl}delivery`, detail)
        return {
            ok : true,
            data : res.data.data
        }
    } catch (error) {
        return {
            ok : false,
            errorMessage : error.response.data.error
        }
    }
}

// get all delivery
export const getDeliveries = async () => {
    try {
        const res = await axios.get(`${baseUrl}delivery`)
        return {
            ok : true,
            data : res.data.data
        }
    } catch (error) {
        return {
            ok : false,
            errorMessage : error.response.data.error
        }
    }
}

// get a single delivery by id
export const getSingleDelivery = async (id) => {
    try {
        const res = await axios.get(`${baseUrl}delivery/${id}`)
        return {
            ok : true,
            data : res.data.data
        }
    } catch (error) {
        return {
            ok : false,
            errorMessage : error.response.data.error
        }
    }
}

// update a delivery
export const updateDelivery = async (id, detail) => {
    try {
        const res = await axios.patch(`${baseUrl}delivery/${id}`, detail)
        return {
            ok : true,
            data : res.data.data
        }
    } catch (error) {
        return {
            ok : false,
            errorMessage : error.response.data.error
        }
    }
}

// delete a delivery
export const deleteDelivery = async (id) => {
    try {
        await axios.delete(`${baseUrl}delivery/${id}`)
        return {
            ok : true,
        }
    } catch (error) {
        return {
            ok : false,
            errorMessage : error.response.data.error
        }
    }
}

// updateDelivery('6300c32f0d4eb858e88e1663', {status:"DELIVERED"}).then(res => {
//     console.log(res)
// })