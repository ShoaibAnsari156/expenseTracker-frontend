import { apiHandler } from "@/utils/fetchHelper";

export const registerUser = async (payload: {
  email: string;
  username: string;
  password: string;
}) => {
  return await apiHandler("/api/v1/user/register", {
    method: "POST",
    body: payload,
  });
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  return await apiHandler("/api/v1/user/login", {
    method: "POST",
    body: payload,
  });
};