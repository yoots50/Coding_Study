import axios from "axios";

export default class FakeAPIClient {
  async products() {
    return axios.get("/json/products.json").then((res) => res.data.products);
  }
  async search(productId) {
    return axios.get("/json/products.json").then((res) => {
      return res.data.products.filter((product) => product.id === productId)[0];
    });
  }
  async wishlist(uid) {
    return axios
      .get("/json/wishlists.json")
      .then(
        (res) =>
          res.data.wishlists.filter((wishlist) => wishlist.uid === uid)[0]
            .wishlist
      );
  }
}
