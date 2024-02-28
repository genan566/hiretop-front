import { api_url } from "./APIRoute";

export class SubmissionAPI {
  async pull__submitemployment() {
    return fetch(api_url("submitemployment/"), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Authorization': "Token " + token,
      },
    }).then((js) => js.ok && js.json());
  }

  async create_submitemployment(data: any, token: string) {
    return fetch(api_url(`submitemployment/`), {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Token " + token,
      },
      body: JSON.stringify(data),
    }).then((js) => js.ok && js.json());
  }

  async retrive_submitemployment(id: number) {
    return fetch(api_url(`submitemployment/?user=${id}`), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Authorization': "Token " + token,
      },
    }).then((js) => js.ok && js.json());
  }

  async update_submitemployment(data: any, id: number, token: string) {
    return fetch(api_url(`submitemployment/${id}/`), {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify(data),
    }).then((js) => js.ok && js.json());
  }

  async upload_cv_to_submitemployment(id: number, data: any, token: string) {
    let dataSent = new FormData();
    dataSent.append("cv_file", data.cv_file);

    if (id) {
      return fetch(api_url(`submitemployment/${id}/upload-cv/`), {
        method: "POST",
        headers: {
          Authorization: "Token " + token,
        },
        body: dataSent,
      }).then((js) => js.ok && js.json());
    }
  }

  async delete_submitemployment(token: string, id_submitemployment: number) {
    if (token && id_submitemployment) {
      return fetch(api_url(`submitemployment/${id_submitemployment}/`), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: "Token " + token,
        },
      }).then((js) => js.ok && { title: "OK" });
      // .then()
    }
  }
}
