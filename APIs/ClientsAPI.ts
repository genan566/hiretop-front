import { api_url } from "./APIRoute";

export class ClientsAPI {
  async pull__client() {
    return fetch(api_url("client/"), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Authorization': "Token " + token,
      },
    }).then((js) => js.ok && js.json());
  }

  async retrive_client(id: number) {
    return fetch(api_url(`client/?user=${id}`), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Authorization': "Token " + token,
      },
    }).then((js) => js.ok && js.json());
  }

  async create_client(data: any) {
    return fetch(api_url(`client/`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((js) => js.ok && js.json());
  }

  async update_client(data: any, id: number, token: string) {
    return fetch(api_url(`client/${id}/`), {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify(data),
    }).then((js) => js.ok && js.json());
  }

  async upload_image_to_client(id: number, data: any, token: string) {
    let dataSent = new FormData();
    dataSent.append("image", data.image);

    if (id) {
      return fetch(api_url(`client/${id}/upload-image/`), {
        method: "POST",
        headers: {
          Authorization: "Token " + token,
        },
        body: dataSent,
      }).then((js) => js.ok && js.json());
    }
  }

  async delete_client(token: string, id_client: number) {
    if (token && id_client) {
      return fetch(api_url(`client/${id_client}/`), {
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
