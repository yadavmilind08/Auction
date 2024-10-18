import { AxiosResponse } from "axios";
import { ILogin } from "../types/Login";
import { IUser } from "../types/User";
import { post } from "./api";
import { IRegister } from "../types/Register";

export const login = async (userData: ILogin): Promise<IUser> => {
  try {
    const response: AxiosResponse<IUser> = await post(
      "/account/login",
      userData as Record<string, unknown>
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const register = async (userData: IRegister): Promise<IUser> => {
  try {
    const response: AxiosResponse<IUser> = await post(
      "/account/register",
      userData as Record<string, unknown>
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
