import { apiHandler } from "@/utils/fetchHelper";

export const getUserProfile = async (userId:any) => {
    return await apiHandler(`/api/v1/user/${userId}/profile`, {
        method: "GET",
    });
}

export const logoutUser = async () => {
    return await apiHandler("/api/v1/user/logout", {
        method: "GET",
    });
}