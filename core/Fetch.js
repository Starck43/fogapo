async function fetcher(url, args = {}) {
  let response;
  return (
    fetch(url, args)
      .then((res) => {
        response = res;
        return res.json();
      })
      .then((json) => {
        return {
          data: json,
          response: response,
          error: !response.ok,
        };
      })
      .catch((err) => {
        console.log("Failed to fetch data:", err);
      }) || { data: null, response: null, error: false }
  );
}

export default fetcher;

export async function Fetch(server, endpoint, params = {}, args = {}) {
  let url = server + endpoint;
  if (!url) return { data: null, error: true };

  if (Object.keys(params).length) {
    params = new URLSearchParams(params);
    url = url + "?" + params.toString();
  }

  return await fetcher(url, args);
}
