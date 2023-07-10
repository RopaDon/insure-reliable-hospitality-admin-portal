import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class BaseService {
  protected api: AxiosInstance;
  protected config: AxiosRequestConfig = {};

  protected setConfig(value: AxiosRequestConfig) {
    this.config = { ...value };
  }

  // --------------------------------------------------------------------------
  // Constructor
  // --------------------------------------------------------------------------
  constructor(api: AxiosRequestConfig | string) {
    const overrides = typeof api === "object" ? api : {};
    const baseURL = typeof api === "string" ? api : undefined;

    const options = {
      timeout: 100000000000,
      headers: {},
      baseURL,
    };

    this.api = axios.create({ ...options, ...overrides });

    this.init();
  }

  // --------------------------------------------------------------------------
  // Methods
  // --------------------------------------------------------------------------
  private init() {
    const { interceptors } = this.api;
    interceptors.request.use(
      (config: any) => {
        let auth = localStorage.getItem("persist:persist");

        const token = this.extractToken();

        config.headers = {
          Authorization: `Bearer ${token}`,
        };

        this.onRequest(config);

        return config;
      },
      async (error: unknown) => {
        this.onRequestError(error);

        return Promise.reject(error);
      }
    );

    interceptors.response.use(
      (response: AxiosResponse<any, any>) => {
        this.onResponse(response);

        return response;
      },
      async (error: unknown) => {
        this.onResponseError(error);

        return Promise.reject(error);
      }
    );
  }

  // --------------------------------------------------------------------------
  // Event Handlers
  // --------------------------------------------------------------------------
  protected onRequest(config: AxiosRequestConfig) {}

  protected onRequestError(error: unknown) {
    // TODO: override
  }

  protected onResponse(response: AxiosResponse) {
    // TODO: override
  }

  protected async onResponseError(error: unknown) {
    // tslint:disable-next-line
    const err: AxiosError = error as any;

    /*  if (err.code === ECONNABORTED) {
        throw new Error(TIMED_OUT.toString());
      }*/
    // Check for 401 events that has to do specifically with expired tokens

    throw error;
  }

  protected extractToken() {
    try {
      let auth = localStorage.getItem("persist:persist");

      if (!auth) {
        return null;
      }
      const result = JSON.parse(auth);
      return JSON.parse(result?.auth ?? "{}")?.auth?.token?.accessToken;
    } catch (err) {
      return null;
    }
  }
}

export { BaseService };
