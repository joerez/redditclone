...
const Post = require('../models/post')
...

describe('Posts', () => {
  it('should create with valid attributes at POST /posts', (done) => {
    // Import your Post model
// How many tours are there now?
Tour.find(function(err, tours) {
  var tourCount = tours.count;

  var tour = { title: "post title", url: "https://www.google.com", summary: "post summary" }

Tour.findOneAndRemove(tour, function() {
  Tour.find(function(err, tours) {
    var tourCount = tours.count;
    chai.request('localhost:3000')
      .post('/tours', tour)
      .end(function (err, res){
        Tour.find(function(err, tours) {
          tourCount.should.be.equal(tours + 1);
          res.should.have.status(200);
        done();
      });
    });
  });
});
  })
})
