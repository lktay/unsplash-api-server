"use strict";

const server = require("../server");

const supertest = require("supertest");
const mockRequest = supertest(server.app); //fake running //code npm i supertest

describe("my API Server", () => {
  // async/await to handle the async behavior of JS,
  it("/ route works", async () => {
    const response = await mockRequest.get("/");
    console.log(response);
    expect(response.status).toEqual(200);
    console.log(response.text);
    expect(response.text).toEqual("Hello world!");
  });

  it("get data from /randomImage ", async () => {
    const response = await mockRequest.get("/randomImage");
    expect(response.status).toEqual(200);
    console.log(typeof response.body);
    expect(typeof response.body).toEqual("object"); // superagent is behind this
  });

  it("handles not found request", async () => {
    const response = await mockRequest.get("/asd");
    expect(response.status).toEqual(404);
  });

  it("respond with a 404 on an invalid method", async () => {
    const response = await mockRequest.post("/searchImage");
    expect(response.status).toEqual(404);
  });

  it("respond with 200 on request to /searchImage with a query parameter", async () => {
    const data = { searchQuery: "cat" };
    const response = await mockRequest.get("/searchImage").query(data);
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual("object");
  });
  // it("respond with 200 on request to /searchImage with a title parameter", async () => {
  //   const data = { title: "cat" };
  //   const response = await mockRequest.get("/searchImage").query(data);
  //   expect(response.status).toBe(200);
  // });

  it("respond with 500 on request to /searchImage without a query parameter", async () => {
    const data = "";
    const response = await mockRequest.get("/searchImage").query(data);
    expect(response.status).toBe(500);
  });
});
