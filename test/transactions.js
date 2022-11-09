const chaiHTTP = require("chai-http");
const chai = require("chai");
const { assert } = require("chai");
const server = require("../app");
const { suite, test } = require("mocha");

chai.use(chaiHTTP);

//estas pruebas no contienen manejo del token. actualizar para recibir y manejar token.

suite("Test on transaction routes", function () {
  const categoryBody = {
    name: "testTransactionCat",
    description: "testTransactionCat",
  };
  const userBody = {
    firstName: "testTrasactionUser",
    lastName: "testTrasactionUser",
    email: "testTrasactionUser@email.com",
    password: "testTrasactionUser",
  };
  let categoryID;
  let userID;
  let transactionID;

  before((done) => {
    chai
      .request(server)
      .post("/categories")
      .send(categoryBody)
      .end((err, res) => {
        categoryID = res.body.body.id;
        done();
      });
  });
  before((done) => {
    chai
      .request(server)
      .post("/users")
      .send(userBody)
      .end((err, res) => {
        userID = res.body.body.id;
        done();
      });
  });

  suite("transaction POST Routes", function () {
    test("Succesfully create transaction", function (done) {
      chai
        .request(server)
        .post("/transactions")
        .send({
          amount: 5000,
          date: "2022/10/28",
          user: userID,
          category: categoryID,
        })
        .end((err, res) => {
          transactionID = res.body.body.id;
          assert.equal(res.status, 200);
          assert.equal(res.body.message, "Transaction created successfully");
          assert.equal(res.body.body.amount, 5000);

          done();
        });
    });
    test("Trying to Post transaction with invalid UserID", function (done) {
      chai
        .request(server)
        .post("/transactions")
        .send({
          amount: 5000,
          date: "2022/10/28",
          user: 0,
          category: categoryID,
        })
        .end((err, res) => {
          assert.equal(res.status, 404);
          done();
        });
    });
    test("Trying to Post transaction with invalid categoryID", function (done) {
      chai
        .request(server)
        .post("/transactions")
        .send({
          amount: 5000,
          date: "2022/10/28",
          user: userID,
          category: 0,
        })
        .end((err, res) => {
          assert.equal(res.status, 404);
          done();
        });
    });
    test("Validation Error", function (done) {
      chai
        .request(server)
        .post("/transactions")
        .send({
          amount: "",
          date: "",
          user: userID,
          category: categoryID,
        })
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, "Validation errors");
          assert.equal(res.body.errors.length, 2);
          done();
        });
    });
  });
  suite("transtaction UPDATE Routes", function () {
    test("Successfuly update transaction", function (done) {
      chai
        .request(server)
        .put(`/transactions/${transactionID}`)
        .send({
          amount: 1,
          date: "2022/10/28",
          user: userID,
          category: categoryID,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, "Transaction updated successfully");
          done();
        });
    });
    test("trying to update transaction with invalid categoryID", function (done) {
      chai
        .request(server)
        .put(`/transactions/${transactionID}`)
        .send({
          amount: 5000,
          date: "2022/10/28",
          user: userID,
          category: 0,
        })
        .end((err, res) => {
          assert.equal(res.status, 404);
          done();
        });
    });
    test("trying to update transaction with invalid userID", function (done) {
      chai
        .request(server)
        .put(`/transactions/${transactionID}`)
        .send({
          amount: 5000,
          date: "2022/10/28",
          user: 0,
          category: categoryID,
        })
        .end((err, res) => {
          assert.equal(res.status, 404);
          done();
        });
    });
    test("trying to update invalid transactionID", function (done) {
      chai
        .request(server)
        .put(`/transactions/0`)
        .send({
          amount: 5000,
          date: "2022/10/28",
          user: 0,
          category: categoryID,
        })
        .end((err, res) => {
          assert.equal(res.status, 404);
          done();
        });
    });
  });
  suite("Get transactions GET routes", function () {
    test("", function (done) {
      chai
        .request(server)
        .get("/transactions")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, "Transactions retrieved successfully");
          done();
        });
    });
    test("Get transactions by ID", function (done) {
      chai
        .request(server)
        .get(`/transactions/${transactionID}`)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, "Transaction retrieved successfully");
          assert.equal(res.body.body.id, transactionID);
          done();
        });
    });
    test("Trying to get unexistent transaction", function (done) {
      chai
        .request(server)
        .get(`/transactions/${transactionID}`)
        .end((err, res) => {
          done();
        });
    });
  });

  suite("Delete transaction DELETE routes", function () {
    test("Succesfully delete transactions", function (done) {
      chai
        .request(server)
        .delete(`/transactions/${transactionID}`)
        .send()
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, "Delete transaction succesfully");
          done();
        });
    });
    test("trying to delete with invalid  transaction ID", function (done) {
      chai
        .request(server)
        .delete(`/transactions/${transactionID}`)
        .send()
        .end((err, res) => {
          assert.equal(res.status, 404);
          done();
        });
    });
  });
});
