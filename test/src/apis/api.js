const BASE_URL = `https://www.reddit.com/r/all.json`;
export default class SearchPostApi {
  constructor() {
    this.controller = new AbortController();
  }

  abort() {
    this.controller.abort();
    this.controller = new AbortController();
  }

  async setSearch(subreddit, params, page) {
    const url = `${BASE_URL}`;
    console.log(url, page);
    const response = await fetch(url, {
      headers: {
        accept: "application/json"
      },
      signal: this.controller.signal
    });
    const data = await response.json();
    console.log('data', data);
    if (response.ok) {
      return data;
    }
    const error = new Error(data.message || "Failed to get posts.");
    error.response = data;
    throw error;
  }
}