'use strict';

const server = require('../server');
const cowsay = require('cowsay');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server module', function(){
  before(done =>{
    server.listen(3000);
    done();
  });

  describe('POST Method', function(){
    describe('/ endpoint', function(){
      it('should respond with a 200 on a request with no text', done =>{
        chai.request(server)
        .post('/')
        .end((err, res) => {
          let cowTest = cowsay.say({text: 'hello world', f: 'turtle'});
          expect(res.text.toString()).to.equal(cowTest);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('/cowsay endpoint', function(){
      it('should respond with a 200 on a proper request', done =>{
        chai.request(server)
        .post('/cowsay')
        .send({text: 'hello world', f: 'turtle'})
        .end((err, res) => {
          let cowTest = cowsay.say({text: 'hello world', f: 'turtle'});
          expect(res.text.toString()).to.equal(cowTest);
          expect(res.status).to.equal(200);
          done();
        });
      });
      it('should respond with a 400 error on bad request', done =>{
        chai.request(server)
        .post('/cowsay/')
        .send({f: 'turtle'})
        .end((err, res) =>{
          let cowTest = cowsay.say({text: 'bad request\ntry localhost:3000/cowsay with a proper body', f: 'turtle'});
          expect(res.text.toString()).to.equal(cowTest);
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('GET method', function() {
    describe('/ endpoint', function() {
      it('should respond with a 200 on a request with no text', done => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
          let cowTest = cowsay.say({text: 'hello world', f: 'turtle'});
          expect(res.text.toString()).to.equal(cowTest);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('/cowsay endpoint', function() {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .get('/cowsay')
        .query({text: 'hello world'})
        .end((err, res) => {
          let cowTest = cowsay.say({text: 'hello world', f: 'turtle'});
          expect(res.text.toString()).to.equal(cowTest);
          expect(res.status).to.equal(200);
          done();
        });
      });
      it('should respond with a 400 error on bad request', done => {
        chai.request(server)
        .get('/cowsay/')
        .query({f: 'turtle'})
        .end((err, res) => {
          let cowTest = cowsay.say({text: 'bad request\ntry localhost:3000/cowsay with a proper body', f: 'turtle'});
          expect(res.text.toString()).to.equal(cowTest);
          expect(res.status).to.equal(400);
        });
        done();
      });
    });
  });

  after(done => {
    server.close();
    done();
  });
});
