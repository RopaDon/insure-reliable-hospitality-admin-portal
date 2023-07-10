import { AxiosError } from "axios";
import { ApiError } from "../types";
import { BaseService } from "./base-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class AppService extends BaseService {
  constructor() {
    super({
      baseURL: `${API_URL}`,
    });
  }
  async exportClientsToCsv(): Promise<any> {
    let result: any = {
      success: true,
    };

    try {
      const response = await this.api.post<any>(`clients/export`, null, {
        responseType: "blob",
      });

      result.data = response.data;

      return result;
    } catch (error) {
      const { response } = error as AxiosError<any>;

      result.success = false;
      result.error = response?.data?.error ?? "An error occured";

      return result;
    }
  }
}

const service = new AppService();

export { service as default, service as AppService };
