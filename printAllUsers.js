mongo = Mongo('localhost');
socialnetworkDB = mongo.getDB('social_network')
userColl = socialnetworkDB.getCollection("Members");

print("\nAll Users: ");
cursor = userColl.find();
cursor.forEach(function(userName){
  printjson(userName);
});
