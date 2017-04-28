var Browser=require('zombie'),
    assert=require('chai').assert;

var browser;

suite('Cross-pages tests',function(){
  setup(function(){
    browser=new Browser();
  });

  test('requesting a group rate quote from hood river tour page should populate the referrer page',
      function(done){
          var referrer='http://localhost:3000/tours/hood-river';
          browser.visit(referrer, function(){
            browser.clickLink('.requestGroupRate',function(){
              assert(browser.field('referrer').value===referrer);
              done();
        });
      });
   });
   test('requesting a group rate quote from oregan coast tour page should populate the referrer page',
      function(done){
        var referrer='http://localhost:3000/tours/oregan-coast';
        browser.visit(referrer, function(){
          browser.clickLink('requestGroupRate',function(){
            assert(browser.field('referrer').value===referrer);
            done();
      });
    });
  });
  test('Visting a request group rate quote directly should populate the referrer page',function(done){
    browser.visit('http://localhost:3000/tours/request-group-rate',function(){
      assert(browser.field('referrer').value==='');
      done();
    });
  });
});
