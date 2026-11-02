// SERVICE LAYER — this file's only job is "talk to the API."
// It knows about axios and the URL. It knows NOTHING about React, JSX,
// state, or how the data ends up on screen. This is the "EmployeeService.js"
// role in Component -> Service -> HTTP -> (Spring Boot, not built here).
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchPostsPage(page, limit) {
  const response = await axios.get(`${BASE_URL}/posts`, {
    params: { _page: page, _limit: limit },
  });

  // Real paginated APIs commonly send the total row count back so the
  // client can work out how many pages exist — either as a response
  // header (what this API does) or a field in the JSON body itself
  // (e.g. { data: [...], totalCount: 100 }).
  const totalCount = Number(response.headers["x-total-count"]) || 0;

  return {
    posts: response.data,
    totalCount,
    totalPages: Math.max(1, Math.ceil(totalCount / limit)),
  };
}
