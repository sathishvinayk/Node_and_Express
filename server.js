var express=require('express'),
    app=express(),
    fortune=require('./lib/fortune.js');

//Handlebars
var handlebars=require('express3-handlebars').create({
  defaultLayout:'main',
  helpers:{
    section: function(name,options){
      if(!this._sections) this._sections={};
      this._sections[name]=options.fn(this);
      return null;
    }
  }
});

//view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine','handlebars');

app.use(require('body-parser')());

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname+'/public'));

app.use(function(req,res,next){
  res.locals.showTexts=app.get('env')!=='production'&& req.query.test==='1';
  next();
});

//Mocked data
function getWeatherData(){
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)',
            },
            {
                name: 'Bend',
                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Partly Cloudy',
                temp: '55.0 F (12.8 C)',
            },
            {
                name: 'Manzanita',
                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Light Rain',
                temp: '55.0 F (12.8 C)',
            },
        ],
    };
}
//middleware for weather partials
app.use(function(req,res,next){
  if(!res.locals.partials) res.locals.partials={};
  res.locals.partials.weather=getWeatherData();
  next();
})
//Home
app.get('/',function(req,res){
  res.render('home');
});

//about
app.get('/about',function(req,res){
  res.render('about', {
    fortune: fortune.getfortune(),
    pageTestScript: '/qa/tests-about.js'
  });
});

//Hood-river
app.get('/tours/hood-river',function(req,res){
  res.render('tours/hood-river');
});

//request group
app.get('/tours/request-group-rate',function(req,res){
  res.render('tours/request-group-rate');
});

app.get('/jquery-test',function(req,res){
  res.render('jquery-test');
});

app.get('/nursery-rhyme',function(req,res){
  res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme',function(req,res){
  res.json({
    animal: 'Squirrel',
    bodyPart:'tail',
    adjective: 'bushy',
    noun: 'heck'
  });
});
app.get('/newsletter',function(req,res){
  res.render('newsletter',{ csrf: 'csrd token goes here'});
});
app.get('/thank-you',function(req,res){
  res.render('thank-you');
});

app.post('/process',function(req,res){
  if(req.xhr || req.accepts('json,html')==='json'){
    res.send({success: true});
  }else {
    res.redirect(303, '/thank-you');
  }
});

//404
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

//500
app.use(function(err,req,res,next){
  console.log(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'),function(){
  console.log('Running on '+ app.get('port'));
});
