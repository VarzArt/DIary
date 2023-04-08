import axios from "axios";

const link = "http://localhost:3000/posts";

export default class PostService {
  static async getAllPosts() {
    const response = await axios.get(link);
    return response;
  }

  static async getFilterAndSort(
    limit = 5,
    page = 1,
    sort,
    content,
    dateBot,
    dateTop
  ) {
    const response = await axios.get(
      `${link}?_sort=${sort}&title_like=${content}&date_gte=${dateBot}&date_lte=${dateTop}`,
      {
        params: {
          _limit: limit,
          _page: page,
        },
      }
    );
    return response;
  }

  static async getComments(id) {
    const response = await axios.get(`${link}/${id}/comments`);
    return response;
  }

  static async getAllComments() {
    const response = await axios.get(`http://localhost:3000/comments`);
    return response;
  }
}
