import axios from "axios";

export default class YoutubeClient {
  constructor(apiClient) {
    this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key: process.env.REACT_APP_API_KEY },
    });
  }
  async search(params) {
    return this.httpClient.get("search", params);
  }

  async videos(params) {
    return this.httpClient.get("videos", params);
  }

  async channels(params) {
    return this.httpClient.get("channels", params);
  }

  async playlist(params) {
    return this.httpClient.get("playlists", params);
  }
}
