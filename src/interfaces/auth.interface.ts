export interface AuthLoginRequest {
  userName: string;
  password: string;
}

export interface AuthMeResponse {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  userToken: UserToken;
}

export interface UserToken {
  id: string;
  name: string;
  userName: string;
  claims: Claim[];
}

export interface Claim {
  value: string;
  type: string;
}
