const requestHeaders = (): HeadersInit => ({
  Accept: 'application/json',
  'Content-Type': 'application/json'
});

function parseStatus(status: number, res: Promise<Response>): Promise<any> {
  return new Promise((resolve, reject) => {
    if (status >= 200 && status < 300) {
      res.then(response => resolve(response)).catch(error => reject(error));
    } else {
      res.then(response => reject(response)).catch(error => reject(error));
    }
  });
}

export default async function apiCaller<T>(
  method: string,
  path: string,
  data?: any
): Promise<T[] | null> {
  const res = await fetch(process.env.REACT_APP_JSON_PLACEHOLDER + path, {
    method,
    headers: requestHeaders(),
    body: data ? JSON.stringify(data) : null
  });
  return parseStatus(res.status, res.json());
}
