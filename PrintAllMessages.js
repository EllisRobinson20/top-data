mongo = Mongo('localhost');
socialnetworkDB = mongo.getDB('social_network')
messColl = socialnetworkDB.getCollection("Messages");

print("\nAll Messages: ");
cursor = messColl.find();
cursor.forEach(function(messages){
  printjson(messages);
});