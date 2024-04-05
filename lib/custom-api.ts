const do_fetch = async (path: string, init?: RequestInit) => {
  const resp = await fetch(path, init);

  const json = await resp.json();

  if (!resp.ok) {
    throw new Error(json.error.message);
  }

  return json.data;
};

type ReqBody = Record<string, any> | string;
const json_headers = { 'Content-Type': 'application/json' };
const text_headers = { 'Content-Type': 'text/plain' };

export const api = {
  async get(path: string) {
    return do_fetch(path);
  },

  async postForm(path: string, formData: FormData) {
    return fetch(path, {
      method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
      body: formData, // a FormData will automatically set the 'Content-Type'
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  },

  async call(
    path: string,
    body: ReqBody,
    method: string = 'POST',
    options?: RequestInit,
  ) {
    const init = {
      method,
      body: JSON.stringify(body),
      headers: json_headers,
      ...options,
    };

    return do_fetch(path, init);
  },
};
