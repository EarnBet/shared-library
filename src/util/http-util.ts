import * as https from "https";
import * as http from "http";

export function httpsGetJson<T>(url: string) {
  return new Promise<T>((resolve, reject) => {
    https
      .get("https://" + url, (resp) => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          try {
            const parsedData = JSON.parse(data);

            resolve(parsedData);
          } catch (error) {
            console.log(data);

            reject(error);
          }
        });
      })
      .on("error", (err) => {
        // console.log("Error: " + err.message);
        // throw err;

        reject(err);
      });
  });
}

export function httpGetJson<T>(url: string) {
  return new Promise<T>((resolve, reject) => {
    http
      .get("http://" + url, (resp) => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          try {
            const parsedData = JSON.parse(data);

            resolve(parsedData);
          } catch (error) {
            console.log(data);

            reject(error);
          }
        });
      })
      .on("error", (err) => {
        // console.log("Error: " + err.message);
        // throw err;

        reject(err);
      });
  });
}

export function httpGet(url: string) {
  return new Promise<string>((resolve, reject) => {
    http
      .get("http://" + url, (resp) => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          // console.log(data);

          resolve(data);
        });
      })
      .on("error", (err) => {
        // console.log("Error: " + err.message);
        // throw err;

        reject(err);
      });
  });
}
