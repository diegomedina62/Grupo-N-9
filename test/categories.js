const chaiHTTP = require("chai-http");
const chai = require("chai");
const { assert } = require("chai");
const server = require("../app");
const { suite, test } = require("mocha");

chai.use(chaiHTTP);

suite("Tests for Categories Routes", function () {
  suite("Create categories: POST-route", function () {
    test("Succesfully create category", function (done) {
      done();
    });
    test("Validation Error", function (done) {
      done();
    });
  });
  suite("Update categories: PUT-route", function () {
    test("Succesfully Update category", function (done) {
      done();
    });
    test("Trying to update unexistent category", function (done) {
      done();
    });
  });
  suite("Get categories: GET-route", function () {
    test("Get all categories", function (done) {
      done();
    });
    test("Get categories by ID", function (done) {
      done();
    });
    test("trying to get unexistent categories", function (done) {
      done();
    });
  });
});
