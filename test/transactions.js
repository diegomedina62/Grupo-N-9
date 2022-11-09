const chaiHTTP = require("chai-http");
const chai = require("chai");
const { assert } = require("chai");
const server = require("../app");
const { suite, test } = require("mocha");

chai.use(chaiHTTP);

suite('Test on transaction routes', function () { 
  suite("transaction POST Routes", function () {
    test("", function (done) { 
      chai
        .request(server)
        .post("")
        .send()
        .end((err, res) => {
          
          done();
        });

    }) 
  })
  suite("transtaction UPDATE Routes", function () {
    
  })
  suite("Get transactions GET routes", function () {
    
  })
  suite("Delete transaction DELETE routes", function () {
    
  })
})