export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }
  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }
  async searchByVideoId(videoId) {
    return this.#searchByVideoId(videoId);
  }
  async searchByChannelId(channelId) {
    return this.#searchByChannelId(channelId);
  }
  async #searchByKeyword(keyword) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          q: keyword,
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #mostPopular() {
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostpopular",
        },
      })
      .then((res) => res.data.items);
  }

  async #searchByVideoId(videoId) {
    return this.apiClient
      .videoIdSearch({
        params: {
          part: "snippet",
          id: videoId,
        },
      })
      .then((res) => res.data.items[0]);
  }

  async #searchByChannelId(channelId) {
    return this.apiClient
      .channelIdSearch({
        params: {
          part: "snippet",
          id: channelId,
        },
      })
      .then((res) => res.data.items[0]);
  }
}
