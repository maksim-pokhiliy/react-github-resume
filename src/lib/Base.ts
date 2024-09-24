import ApiClient from "./ApiClient";

class Base {
  apiClient: ApiClient;

  constructor({ apiClient }: { apiClient: ApiClient }) {
    if (!apiClient) {
      throw new Error("[apiClient] is required");
    }

    this.apiClient = apiClient;
  }
}

export default Base;
