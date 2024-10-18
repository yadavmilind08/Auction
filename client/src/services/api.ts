import api from "./axios";

export const get = async <T>(
  url: string,
  params: Record<string, unknown> = {}
): Promise<T> => {
  return api.get(url, { params });
};

export const post = async <T>(
  url: string,
  data: Record<string, unknown> = {}
): Promise<T> => {
  return api.post(url, data);
};

export const put = async <T>(
  url: string,
  data: Record<string, unknown> = {}
): Promise<T> => {
  return api.put(url, data);
};

export const del = async <T>(
  url: string,
  params: Record<string, unknown> = {}
): Promise<T> => {
  return api.delete(url, { params });
};
