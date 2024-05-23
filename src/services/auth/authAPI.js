import axios from "axios";

const BASE_URL = "http://localhost:8080"
const SIGN_UP = "/api/v1/signup"
const OAUTH2_SIGN_UP = "/api/v1/oauth2/signup"
const OAUTH2_ACCESS_TOKEN = "/api/v1/oauth2/accessToken"
const DUPLICATE = "/duplicate"
const AUTH_EMAIL = "/email"
const VERIFICATION_CODE = "/verification-code";
const LOGIN = "/api/v1/login"
const _403Error = "로그인 한 상태에서는 불가능한 API 요청입니다."
export const requestDuplicate = async (field) => {
  if (sessionStorage.getItem("accessToken")) {
    throw _403Error;
  }
  try {
    const response = await axios.get(BASE_URL + SIGN_UP + DUPLICATE, {
      params: {
        field: field.name,
        value: field.value
      }
    });
    return response.data.message;
  } catch (error) {
    throw error;
  }
}

export const requestAuthEmail = async (email) => {
  if (sessionStorage.getItem("accessToken")) {
    throw _403Error;
  }
  try {
    const response = await axios.post(BASE_URL + SIGN_UP + AUTH_EMAIL, {
      email: email
    });
    return response.data.signingToken;
  } catch (error) {
    throw error
  }
}

export const requestCheckingVerification = async (authCode, signingToken) => {
  if (sessionStorage.getItem("accessToken")) {
    throw _403Error;
  }
  try {
    const response = await axios.post(BASE_URL + SIGN_UP + VERIFICATION_CODE, {
      authCode: authCode,
      signingToken: signingToken
    });
    return response.data.signingToken;
  } catch (error) {
    throw error;
  }
}
export const requestSignUp = async (fields) => {
  if (sessionStorage.getItem("accessToken")) {
    throw _403Error;
  }
  let data = {
    email: fields.email["value"],
    password: fields.password["value"],
    passwordConfirm: fields.passwordConfirm["value"],
    address: fields.address["value"],
    nickname: fields.nickname["value"],
    phone: fields.phone["value"]
  }
  try {
    const response = await axios.post(BASE_URL + SIGN_UP, data);
    return response.data.message
  } catch (error) {
    throw error
  }
}
export const requestOauthSignUp = async (fields, accessToken) => {
  if (sessionStorage.getItem("accessToken")) {
    throw _403Error;
  }
  let data = {
    nickname: fields.nickname["value"],
    address: fields.address["value"],
    phone: fields.phone["value"]
  }
  try {
    const response = await axios.post(BASE_URL + OAUTH2_SIGN_UP, data, {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    return response.data.message
  } catch (error) {
    throw error
  }
}

export const requestAccessTokenForOAuth2Login = async () => {
  if (sessionStorage.getItem("accessToken")) {
    throw _403Error;
  }
  try {
    const response = await axios.get(BASE_URL + OAUTH2_ACCESS_TOKEN, {
      withCredentials: true
    });
    return response;
  } catch (error) {
    return error;
  }
}

export const requestLogin = async (fields) => {
  if (sessionStorage.getItem("accessToken")) {
    throw _403Error;
  }
  let data = {
    email: fields.email.value,
    password: fields.password.value
  }
  try {
    const response = await axios.post(BASE_URL + LOGIN, data);
    return response;
  } catch (error) {
    throw error;
  }
}
