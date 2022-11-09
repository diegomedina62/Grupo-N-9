const chaiHTTP = require("chai-http");
const chai = require("chai");
const { assert } = require("chai");
const server = require("../app");
const { suite, test } = require("mocha");

chai.use(chaiHTTP);

//estos test no incluyen manejo del JWT. si se agregan middlewares se debe modificar

suite("Tests for Categories Routes", function () {
  const testReqBody = {
    name: "testCategory",
    description: "testCategory",
  };
  const updateReqBody = {
    name: "updateCategory",
    description: "updateCategory",
  };
  let categoryID;

  suite("Create categories: POST-route", function () {
    test("Succesfully create category", function (done) {
      chai
        .request(server)
        .post("/categories")
        .send(testReqBody)
        .end((err, res) => {
          categoryID = res.body.body.id;
          assert.equal(res.status, 200);
          assert.hasAllKeys(res.body, ["status", "code", "message", "body"]);
          assert.equal(res.body.message, "Create a new category");
          assert.equal(res.body.body.name, "testCategory");
          assert.equal(res.body.body.description, "testCategory");
          done();
        });
    });
    test("Validation Error", function (done) {
      chai
        .request(server)
        .post("/categories")
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, "Validation errors");
          assert.equal(res.body.errors.length, 1);
          done();
        });
    });
  });
  suite("Update categories: PUT-route", function () {
    test("Succesfully Update category", function (done) {
      chai
        .request(server)
        .put(`/categories/${categoryID}`)
        .send(updateReqBody)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, "edit a category");
          assert.equal(res.body.body.name, "updateCategory");
          assert.equal(res.body.body.description, "updateCategory");
          done();
        });
    });
    test("Trying to update unexistent category", function (done) {
      chai
        .request(server)
        .put(`/categories/0`)
        .send(updateReqBody)
        .end((err, res) => {
          assert.equal(res.status, 404);
          done();
        });
    });
  });
  suite("Get categories: GET-route", function () {
    test("Get all categories", function (done) {
      chai
        .request(server)
        .get(`/categories`)
        .send(updateReqBody)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, "Get categories");
          assert.hasAllKeys(res.body, ["status", "code", "message", "body"]);
          done();
        });
    });
    test("Get categories by ID", function (done) {
      chai
        .request(server)
        .get(`/categories/${categoryID}`)
        .send(updateReqBody)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, "obtain category data");
          done();
        });
    });
    test("trying to get unexistent categories", function (done) {
      chai
        .request(server)
        .get(`/categories/0`)
        .send(updateReqBody)
        .end((err, res) => {
          assert.equal(res.status, 404);
          done();
        });
    });
  });
});
