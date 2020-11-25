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
/*stats = socialnetworkDB.stats
printjson("STATS:\n"+stats)*/

// create users
admins_array = ["lee", "james", "lucy"];
admins_array.forEach(adminUser => addUserIfExists(adminUser))
function addUserIfExists(user) {
	if(!socialnetworkDB.getUser(user)) {
		print("creating user " + user)
		socialnetworkDB.createUser(
		{
			user: user,
			pwd: "%P@55w0rd",
			roles: ["readWrite", "dbAdmin"/*,"readWriteAnyDatabase","dbAdminAnyDatabase","clusterAdmin"*/ ]
		})
	} else {
		print(user+" already exists")
	}
}
printjson(socialnetworkDB.getUsers());


