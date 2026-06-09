import{
    useQueryClient,
    useMutation,
    useQuery

}from"@tanstack/react-query"

import {
    userAllGetApi,
    userLoginApi,
    userRegisterApi,
}from "../apis/user.api"

export const useAllGetUser = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: userAllGetApi
    })
}

export const useLoginUser = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: userLoginApi,
        onSuccess: (user) => {
            localStorage.setItem("currentUser", JSON.stringify(user))
            queryClient.setQueriesData(
                ["currentUser"], user
            )
        }
    })
}

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: userRegisterApi
    })
}

export const logout = () =>{
    localStorage.removeItem("currentUser")
}

export const getCurrentUser = () =>{
    const user = localStorage.getItem("currentUser")
    return user && JSON.parse(user)
}