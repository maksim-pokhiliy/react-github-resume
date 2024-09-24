export interface IApiError {
  error: any;
  status: number;
}

interface IRequestArgs {
  url: string;
  method: "GET";
}

interface IApiResponse<T> {
  data: T;
  status: number;
}

export default class ApiClient {
  apiUrl: string;

  constructor({ apiUrl }: { apiUrl: string }) {
    if (!apiUrl) {
      throw new Error("[apiUrl] is required");
    }

    this.apiUrl = apiUrl;
  }

  async get<T>(url: IRequestArgs["url"]): Promise<IApiResponse<T>> {
    return this.request<T>({ url, method: "GET" });
  }

  async request<T>({ url, method }: IRequestArgs): Promise<IApiResponse<T>> {
    const requestUrl = `${this.apiUrl}${url}`;

    const options: RequestInit = {
      method,
    };

    const response = await fetch(requestUrl, options);

    if (!response.ok) {
      const contentType = response.headers.get("content-type");

      let error;

      if (contentType && contentType.includes("application/json")) {
        error = await response.json();
      } else {
        error = await response.text();
      }

      throw { error, status: response.status } as IApiError;
    }

    const json = await response.json();

    return { data: json, status: response.status };
  }
}
