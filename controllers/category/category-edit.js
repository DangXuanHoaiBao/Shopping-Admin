var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.mongodb.net/test?retryWrites=true&w=majority";

let object_id;
router.get('/category-edit-:id', function(req,res, next){
  var id = req.params.id;
  object_id = new ObjectId(id);
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionCategory = client.db("shoppingdb").collection("Category");
      let Async_Await = async()=>{
        let categoryid = await collectionCategory.findOne({_id: object_id});
        client.close();
        res.render('category-edit', {title: 'Category Edit', 'categoryid': categoryid, 'user': req.user});
      }
      Async_Await();
    }
  });
});

router.post('/category-edit', function(req, res, next){
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      const collectionCategory = client.db("shoppingdb").collection("Category");
      var category_edit = {
        Name: req.body.Name
      };
      collectionCategory.updateOne({"_id": object_id},{$set: category_edit}, function(err, res){
        client.close();
        if(err){
          console.log(err);
        }
        else{
          
          console.log("category is Updated ");
        }
      });
      res.redirect('/category-list');
    }
  });
});

module.exports = router;
