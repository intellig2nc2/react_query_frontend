import axios from "axios";

export const userAllGetApi = async () =>{
    try{
        const response = await axios.get("http://localhost:3001/user")
        return response.data
    }catch(error){
        return error
    }
}

export const userLoginApi = async (userObj) => {
    try {
        const response = await axios.get(
            `http://localhost:3001/user?name=${userObj.username}`
        )

        const users = response.data

        if (!users.length) {
            throw new Error("존재하지 않는 사용자입니다.")
        }

        const loginUser = users[0]

        if (loginUser.password !== userObj.password) {
            throw new Error("비밀번호가 일치하지 않습니다.")
        }

        return loginUser

    } catch (error) {
        throw error
    }
}

export const userRegisterApi = async (userObj) => {
    try {
        const response = await axios.post(
            "http://localhost:3001/user",
            userObj
        )

        return response.data
    } catch (error) {
        throw error
    }
}



export const userPostApi = async (dataObj) =>{
    try{
        const response = await axios.get(`http://localhost:3001/user?name=${userObj.username}`)
        const users = response.data
        if(users.length>0){
            return alert("이미 존재하는 사용자입니다.")
        } 
        return await axios.post(`http://localhost:3001/user`, dataObj)
        
    }catch(error){
        return error
    }
}

// export const userPutApi = async (dataObj) =>{
//     try{
//         const response = await axios.put("http://localhost:3001/user/${}", dataObj)
//         return response.data
//     }catch(error){
//         return error
//     }
// }

// export const userDeleteApi = async () =>{
//     try{
//         const response = await axios.delete("http://localhost:3001/user/2")
//         return response.data
//     }catch(error){
//         return error
//     }
// }