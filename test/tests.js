import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../overflow api/app';


chai.use(chaiHttp);
chai.should();




// describe("Students", () => {
//   it("should get all question", (done) => {
//     chai.request(app)
//         .get('/')
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             done();
//          });
// });

//  it('should list a SINGLE app on /questions/<id> GET');
//  it('should add a SINGLE blob on /questions POST');
// });

describe('questions', () => {
  describe('GET /', () => {
    // Test to get all students record
    it('should get all questions', (done) => {
      chai.request(app)
        .get('/questions')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
//   describe('GET /', () => {
//     // Test to get all students record
//     it('should get all questions', (done) => {
//       chai.request(app)
//         .get('/questions:id')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           done();
//         });
//     });
//   });
});
