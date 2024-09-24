import Base from "./Base";

export default class AuthAPI extends Base {
  retrieve(username: string) {
    return this.apiClient.get(`/users/${username}`);
  }
}
