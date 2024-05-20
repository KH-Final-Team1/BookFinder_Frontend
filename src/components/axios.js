import axios from "axios";

const BASE_URL = "http://localhost:8080"
const SIGN_UP = "/api/v1/signup"
const DUPLICATE = "/duplicate"
const AUTH_EMAIL = "/email"
const VERIFICATION_CODE = "/verification-code";
export const requestDuplicate = async (field) => {
  try {
    const response = await axios.get(BASE_URL + SIGN_UP + DUPLICATE, {
      params: {
        field: field.name,
        value: field.value
      }
    });
    return response.data.message;
  } catch (error) {
    throw error.response.data.details[field.name];
  }
}

export const requestAuthEmail = async (email) => {
  try {
    const response = await axios.post(BASE_URL + SIGN_UP + AUTH_EMAIL, {
      email: email
    });
    return response.data.signingToken;
  } catch (error) {
    throw error.response.data.details
  }
}

export const requestCheckingVerification = async (authCode, signingToken) => {
  try {
    const response = await axios.post(BASE_URL + SIGN_UP + VERIFICATION_CODE, {
      authCode: authCode,
      signingToken: signingToken
    });
    return response.data.signingToken;
  } catch (error) {
    throw error.response.data
  }
}
export const requestSignUp = async (fields) => {
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
    throw error.response.data
  }
}