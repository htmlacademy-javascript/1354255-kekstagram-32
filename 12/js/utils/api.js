import { MethodEnum } from './constants.js';

const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

export const apiHandler = async (endpoint, method = MethodEnum.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, { method, body });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
