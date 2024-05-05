import axios from "axios";
axios.defaults.headers.common["Content-Type"] = "application/json";

const _ajax = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

export function apiGet(url, options) {
  return _ajax.get(url, options);
}

export async function apiPost(url, data, options = {}) {
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  const { onUploadProgress } = options;
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  try {
    const respon = await _ajax.post(url, data, {
      headers: headers,
      cancelToken: source.token,
      onUploadProgress: onUploadProgress,
    });

    return {
      data: respon.data,
      cancel: source.cancel,
    };
  } catch (error) {
    console.log(error);
  }
}
