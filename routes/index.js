var express = require('express');
var router = express.Router();
var db = require('monk')("localhost/heros")
var Heros = db.get('heros')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/create-hero', function(req, res){
  Heros.insert({
    hero: req.body.heroName,
    power: req.body.heroPower
  })
  res.redirect('/list')
});

router.get("/list", function(req, res){
  Heros.find({}, function (err, heros){
    console.log(heros);
    res.render('list', {heros: heros})
  })
})

router.get('/list/:id', function(req, res){
  Heros.find({_id: req.params.id}, function(err, hero){
    res.render("show.jade", {hero: hero[0]})
  })
})

router.get('/list/:id/edit', function(req, res){
  Heros.find({_id: req.params.id}, function(err, hero){
    res.render("edit.jade", {hero: hero[0]})
  })
})

router.post('/update-hero', function(req, res){
  Heros.updateById(req.body.heroId,
    {$set: {
              hero: req.body.heroName,
              power: req.body.heroPower

            }
    },
    function (err, hero){
      if(err){
        console.log(err);
      }
    }
  );
  res.redirect('/list');
});

router.post('/list/:id/delete', function(req, res){
  Heros.remove({_id: req.params.id}, function(err, hero){
    res.redirect('/list')
  })
});

module.exports = router;
