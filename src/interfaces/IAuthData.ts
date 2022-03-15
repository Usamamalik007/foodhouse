export interface IUserSessionData {
  statusCode: number;
  message: string;
  user: IUserData;
  refreshToken: string;
  token: string;
  expiry_time: string;
}

export interface IUserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  is_email_verified: boolean;
  phone_number: string;
  is_blocked: boolean;
  dob: string;
  gender: string;
  created_at: string;
  updated_at: string;
  role: Role;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

interface Role {
  id: number;
  name: string;
}

//------ Register User Interface----//
export interface IRegisterUserRequest {
  fname: string;
  lname: string;
  email: string;
  password: string;
  gender: number
}

export interface IRegisterUserResponse {
  statusCode: number;
  message: string;
  insert_id: number;
}

//------ Forgot Password Interface----//
export interface IForgotPasswordRequest {
  email: string;
}

export interface IForgotPasswordResponse {
  email: string;
  statusCode: number;
  message: string;
}
