import { ref } from "vue";

// 'http://localhost:3095/api/users/login'
export const BASE_URL = `http://localhost:3000/api`;
export const SOCKET_URL = `http://localhost:3000`;
export const TOKEN = 'token';
export const PAGE_SIZE = 20;

export const axiosOptions = {
  withCredentials: true
}

export const globalChannels = ref('');
export const globalMembers = ref('');