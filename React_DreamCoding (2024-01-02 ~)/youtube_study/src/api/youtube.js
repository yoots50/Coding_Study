import axios from "axios";

export async function search(keyword) {
  return axios
    .get(`/videos/${keyword ? "search" : "popular"}.json`)
    .then((res) => {
      console.log(res.data.items);
      return res.data.items;
    });
}
