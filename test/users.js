const chaiHTTP = require("chai-http");
const chai = require("chai");
const { assert } = require("chai");
const server = require("../app");
const { suite, test } = require("mocha");

chai.use(chaiHTTP);

suite("Tests for Users Routes", function () {
  const testBodyRequest = {
    firstName: "userCreate",
    lastName: "userCreate",
    email: "userCreate@email.com",
    password: "passwordCreate",
    //lleva avatar??
  };

  // ¿la ruta va a estar protegida por token?si es asi, se debe agregar codigo para conseguir token y autorizacion

  suite("create User ", function () {
    let testUserID;
    test("succesfull creation of user", function (done) {
      chai
        .request(server)
        .post("/users")
        .send(testBodyRequest)
        .end((err, res) => {
          testUserID = res.body.body.id;
          assert.equal(res.status, 200);
          assert.hasAllKeys(res.body, ["status", "code", "message", "body"]);
          assert.equal(res.body.body.firstName, "userCreate");
          assert.equal(res.body.body.lastName, "userCreate");
          done();
        });
    });

    test("Email already exists ", function (done) {
      chai
        .request(server)
        .post("/users")
        .send(testBodyRequest)
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

  suite("Update User", function () {});
});
