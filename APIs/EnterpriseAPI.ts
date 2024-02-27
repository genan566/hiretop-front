import { api_url } from "./APIRoute";

export class EnterpriseAPI {
  async pull__enterprise() {
    return fetch(api_url("enterprise/"), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Authorization': "Token " + token,
      },
    }).then((js) => js.ok && js.json());
  }

  async create_enterprise(data: any) {
    return fetch(api_url(`enterprise/`), {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    }).then((js) => js.ok && js.json());
  }

  async retrive_enterprise(id: number) {
    return fetch(api_url(`enterprise/?user=${id}`), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Authorization': "Token " + token,
      },
    }).then((js) => js.ok && js.json());
  }

  async update_enterprise(data: any, id: number, token: string) {
    return fetch(api_url(`enterprise/${id}/`), {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify(data),
    }).then((js) => js.ok && js.json());
  }

  async upload_image_to_enterprise(id: number, data: any, token: string) {
    let dataSent = new FormData();
    dataSent.append("image", data.image);

    if (id) {
      return fetch(api_url(`enterprise/${id}/upload-image/`), {
        method: "POST",
        headers: {
          Authorization: "Token " + token,
        },
        body: dataSent,
      }).then((js) => js.ok && js.json());
    }
  }

  async delete_enterprise(token: string, id_enterprise: number) {
    if (token && id_enterprise) {
      return fetch(api_url(`enterprise/${id_enterprise}/`), {
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
