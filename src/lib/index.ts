import ApiClient from "./ApiClient";
import UserAPI from "./User";

export interface IApiConstructArgs {
  apiUrl: string;
}

export default function apiConstruct({ apiUrl }: IApiConstructArgs) {
  if (!apiUrl) {
    throw new Error("[apiUrl] is required");
  }

  const apiClient = new ApiClient({ apiUrl });

  return {
    apiClient,
    user: new UserAPI({ apiClient }),
  };
}
