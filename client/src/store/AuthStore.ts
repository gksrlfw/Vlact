import axios, { AxiosResponse } from 'axios';
import { reactive, toRefs } from "vue";
import { LoginRequest } from "@/interfaces/auth/LoginRequest";
import { LoginResponse } from "@/interfaces/auth/LoginResponse";
import { RegisterRequest } from "@/interfaces/auth/RegisterRequest";
import { BASE_URL, TOKEN, axiosOptions } from "@/store/GlobalVariable";
import { AuthStoreState } from '@/interfaces/auth/AuthStoreState';

export class AuthStore {
  private authState = reactive({
    loginError: '',
    registerError: '',
    isLogin: false,
    isRegister: false,
    loginResponse: {},
  });

  public getAuthState() { 
    return this.authState;
  }

  public setAuthState(loginResponse: any) {
    
    // this.authState.isLogin = loginResponse.isLogin;
    // this.authState.isRegister = loginResponse.isRegister;
    // this.authState.loginError = loginResponse.loginError;
    // this.authState.registerError = loginResponse.registerError;
    this.authState.loginResponse = loginResponse;
    this.authState.isLogin = true;
  }

  public async getAllInfo() {
    try {
      const response = await axios.get(`${BASE_URL}/users`, axiosOptions);
      console.log(response, response.data);
      return response.data
    }
    catch(err) {
      console.error(err);
    }
  }

  public async login(loginRequest: LoginRequest) {
    try {
      this.initLogin();
      // const response: AxiosResponse<any> = await axios.post(`${BASE_URL}/users/login`, loginRequest, axiosOptions);
      // console.log(response, response.data);
      // const data = response.data;
      // sessionStorage.setItem(TOKEN, data.token);
      await axios.post(`${BASE_URL}/users/login`, loginRequest, axiosOptions);
      const response = await this.getAllInfo();
      this.succeedLogin(response);
      sessionStorage.setItem(TOKEN, JSON.stringify(response));
      return this.getAuthState();
    } 
    catch (err) {
      console.error(err.response);
      this.failedLogin(err.response.data);
    }
  }

  public async register(registerRequest: RegisterRequest) {
    try {
      this.initRegister();
      const response = await axios.post(`${BASE_URL}/users`, registerRequest);
      console.log(response);
      this.succeedRegister();
    } 
    catch (err) {
      console.error(err.response);
      this.failedRegister(err.response.data);
    }
  }

  public async logout() {
    if(sessionStorage.getItem(TOKEN)) sessionStorage.removeItem(TOKEN);
    const res = await axios.post(`${BASE_URL}/users/logout`, null, axiosOptions);
    this.clearState();
    console.log('logout', res);
    
  }

  public clearError() {
    this.authState.loginError = '';
    this.authState.registerError = '';
  }

  private clearState() {
    this.authState.isLogin = false;
    this.authState.isRegister = false;
    this.authState.loginError = '';
    this.authState.registerError = '';
    this.authState.loginResponse = {};
  }

  private initLogin() {
    this.authState.isLogin = false;
    this.authState.loginError = '';
  }
  private initRegister() {
    this.authState.registerError = '';
    this.authState.isRegister = false;
  }
  private succeedLogin(loginResponse: any) {    
    this.authState.loginResponse = loginResponse;
    this.authState.isLogin = true;
  }

  private succeedRegister() {
    this.authState.isRegister = true;
  }

  private failedLogin(error: string) {
    this.authState.isLogin = false;
    this.authState.loginError = error;
  }

  private failedRegister(error: string) {
    this.authState.isRegister = false;
    this.authState.registerError = error;
  }
}

const authStore = new AuthStore();
export default authStore;
