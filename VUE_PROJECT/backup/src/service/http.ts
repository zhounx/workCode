import service from "./index";

export function request(
  method: string,
  url: string,
  params: object,
  responseType?: any
) {
  let methods: any = method.toUpperCase();
  if (methods === "GET" || method === "get") {
    return service({
      url: url,
      method: "GET",
      params: params,
      responseType: responseType || "json",
    });
  } else {
    return service({
      url: url,
      method: methods,
      data: params,
      responseType: responseType || "json",
    });
  }
}
