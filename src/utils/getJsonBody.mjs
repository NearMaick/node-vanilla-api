export function getJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request
      .on("data", (chunk) => {
        body += chunk;
      })
      .on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
  });
}
