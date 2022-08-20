import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL

// create a new package 
export const createPackage = async (detail) => {
    try {
        const res = await axios.get(`${baseUrl}package`, detail)
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

// get all packages
export const getpackages = async () => {
    try {
        const res = await axios.get(`${baseUrl}package`)
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

// get a single package by id
export const getSinglePackage = async (id) => {
    try {
        const res = await axios.get(`${baseUrl}package/${id}`)
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

// update a package
export const updatePackage = async (id, detail) => {
    try {
        const res = await axios.patch(`${baseUrl}package/${id}`, detail)
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

// delete a package
export const deletePackage = async (id) => {
    try {
        await axios.delete(`${baseUrl}package/${id}`)
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



