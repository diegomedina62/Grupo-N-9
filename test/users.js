const chaiHTTP = require("chai-http");
const chai = require("chai");
const { assert } = require("chai");
const server = require("../app");
const { suite, test } = require("mocha");

chai.use(chaiHTTP);

suite("Tests for Users Routes", function () {
  const createBodyRequest = {
    firstName: "userCreate",
    lastName: "userCreate",
    email: "userCreate@email.com",
    password: "passwordCreate",
    //lleva avatar??
  };
  const updateBodyRequest = {
    email: "updated@gmail.com",
    firstName: "updatedName",
    lastName: "updatedLastname",
    password: "passwordUpdate",
  };
  // ¿la ruta va a estar protegida por token?si es asi, se debe agregar codigo para conseguir token y autorizacion

  let testUserID;
  suite("create User ", function () {
    test("succesfull creation of user", function (done) {
      chai
        .request(server)
        .post("/users")
        .send(createBodyRequest)
        .end((err, res) => {
          testUserID = res.body.body.id;
          assert.equal(res.status, 200);
          assert.hasAllKeys(res.body, ["status", "code", "message", "body"]);
          assert.equal(res.body.message, "User successfully created");
          assert.equal(res.body.body.firstName, "userCreate");
          assert.equal(res.body.body.lastName, "userCreate");
          done();
        });
    });

    test("Email already exists ", function (done) {
      chai
        .request(server)
        .post("/users")
        .send(createBodyRequest)
        .end((err, res) => {
          assert.equal(res.status, 400);
          done();
        });
    });

    test("Validation Errors", function (done) {
      chai
        .request(server)
        .post("/users")
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, "Validation errors");
          assert.hasAllKeys(res.body, [
            "message",
            "statusCode",
            "status",
            "isOperational",
            "errors",
          ]);
          assert.equal(res.body.errors.length, 4);
          done();
        });
    });
  });

  suite("Update User", function () {
    test("Successfull user update", function (done) {
      chai
        .request(server)
        .put(`/users/${testUserID}`)
        .send(updateBodyRequest)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.hasAllKeys(res.body, ["status", "code", "message", "body"]);
          assert.equal(res.body.message, "User upgraded successfully");
          assert.equal(res.body.body.firstName, "updatedName");
          assert.equal(res.body.body.lastName, "updatedLastname");
          done();
        });
    });
    test("Trying update inexistent User", function (done) {
      chai
        .request(server)
        .put(`/users/0`)
        .send(updateBodyRequest)
        .end((err, res) => {
          assert.equal(res.status, 400);
          done();
        });
    });
  });
  suite("Get Users", function () {
    test("Get user by ID", function (done) {
      chai
        .request(server)
        .get(`/users/${testUserID}`)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, "User Id succesfully");
          done();
        });
    });
    test("Get All Users", function (done) {
      chai
        .request(server)
        .get(`/users/`)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, "All users");
          assert.hasAllKeys(res.body, ["status", "code", "message", "body"]);
          done();
        });
    });
    test("Trying to get Unexistent User", function (done) {
      chai
        .request(server)
        .get(`/users/0`)
        .end((err, res) => {
          assert.equal(res.status, 404);
          done();
        });
    });
  });
  suite("Delete User", function () {
    test("succesfully delete User", function (done) {
      chai
        .request(server)
        .delete(`/users/${testUserID}`)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, "User deleted successfully");
          done();
        });
    });
    test("Trying to delete unexistent user", function (done) {
      chai
        .request(server)
        .delete(`/users/${testUserID}`)
        .end((err, res) => {
          assert.equal(res.status, 404);
          done();
        });
    });
  });
});
