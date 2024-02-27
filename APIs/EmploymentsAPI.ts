import { api_url } from "./APIRoute";

export class EmploymentsAPI {

    async pull__employments() {
        return fetch(
            api_url('employments/'),
            {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': "Token " + token,
                }

            }
        )
            .then((js) => js.ok && js.json())
    }

    async create_employments(data: any, token: string) {

        return fetch(
            api_url(`employments/`),
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': "Token " + token,
                },
                body: JSON.stringify(data)
            }
        )
            .then((js) => js.ok && js.json())

    }

    async update_employments(data: any, id: number, token: string) {

        return fetch(
            api_url(`employments/${id}/`),
            {
                method: "PATCH",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Token " + token,
                },
                body: JSON.stringify(data)
            }
        )
            .then((js) => js.ok && js.json())
    }

    async upload_image_to_employments(id: number, data: any, token: string) {

        let dataSent = new FormData()
        dataSent.append("image", data.image)

        if (id) {
            return fetch(
                api_url(`employments/${id}/upload-image/`),
                {
                    method: "POST",
                    headers: {
                        'Authorization': "Token " + token,
                    },
                    body: dataSent
                }
            )
                .then((js) => js.ok && js.json())
        }

    }

    async delete_employments(token: string, id_employments: number,) {
        if (token && id_employments) {
            return fetch(
                api_url(`employments/${id_employments}/`),
                {
                    method: "DELETE",
                    headers: {
                        'Content-Type': "application/json;charset=utf-8",
                        'Authorization': "Token " + token,
                    },
                }
            )
                .then((js) => js.ok && { title: "OK" })
            // .then()
        }

    }
}