import axios from "axios";
const URL_API = "http://localhost:4000/api/";
export class BaseService {
  put = (url, model) => {
    return axios({
      url: `${URL_API}${url}`,
      method: "PUT",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      }, //JWT
    });
  };

  post = (url, data) => {
    return axios({
      url: `${URL_API}${url}`,
      method: "POST",
      data: data,
    });
  };

  get = (url) => {
    return axios({
      url: `${URL_API}${url}`,
      method: "GET",
    });
  };

  delete = (url) => {
    return axios({
      url: `${URL_API}${url}`,
      method: "DELETE",
    });
  };
}
