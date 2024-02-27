// export const routeAPIBase = "https://gen3566.pythonanywhere.com/api/v1/"
export const routeAPIBase = "http://127.0.0.1:7000/api/v1/";
// export const routeAPIBaseImage = "https://gen3566.pythonanywhere.com"
export const routeAPIBaseImage = "http://127.0.0.1:7000";

export const routeAPIBaseImageFunc = (url: string) =>
  `${routeAPIBaseImage}${url}`;

export const api_url = (endpoint: string) => routeAPIBase + endpoint;
