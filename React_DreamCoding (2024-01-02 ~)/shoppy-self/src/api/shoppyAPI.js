export default class ShoppyAPI {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async loadProducts() {
    return this.apiClient.products();
  }

  async searchByProductId(params) {
    return this.apiClient.search(params);
  }

  async wishlist(uid) {
    return this.apiClient.wishlist(uid);
  }
}
