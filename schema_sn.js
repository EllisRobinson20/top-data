mongo = Mongo('localhost');
//Create DB
socialnetworkDB = mongo.getDB('social_network');
//check collections
collections = socialnetworkDB.getCollectionNames();
print("Database Name: social_network ... Showing Initial Collections: ");
printjson(collections);
//create collections
collections_array = ["Profiles", "Members", "Friends", "Messages"];
//function createCollection(coll) {socialnetworkDB.createCollection(coll)}
collections_array.forEach(collection => socialnetworkDB.createCollection(collection));
//check collections
collections = socialnetworkDB.getCollectionNames();
print("After Creation of collections: ");
printjson(collections);
// create users
printjson(db.getUsers());
admins_array = ["lee", "james", "lucy"];
admins_array.forEach(user => {
	socialnetworkDB.creatUser(
		{
			user: user,
			pwd: "%P@55w0rd",
			roles: ["readWrite", "dbAdmin"]
		}
	)
});
printjson(db.getUsers());


