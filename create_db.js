mongo = Mongo('localhost');
//Create DB
socialnetworkDB = mongo.getDB('social_network');
admins_array = ["lee", "james", "lucy"];
collections_array = ["Usernames", "Members", "Messages"];
users = hasUsers = socialnetworkDB.getUsers()
collections = hasCollections = socialnetworkDB.getCollectionNames();
// remove existing users if already exist
if(hasUsers) {
	print("removing users")
	printjson(users)
	users.forEach(user => socialnetworkDB.dropUser(user.user))
}
// create the admin users
admins_array.forEach(adminUser => addUserIfExists(adminUser))
function addUserIfExists(user) {
	if(!socialnetworkDB.getUser(user)) {
		print("creating user " + user)
		socialnetworkDB.createUser(
		{
			user: user,
			pwd: "password",
			roles: ["dbOwner"/*, "clusterAdmin","readWriteAnyDatabase","dbAdminAnyDatabase","clusterAdmin"*/ ]
		})
	} else {
		print(user+" already exists")
	}
}
printjson(users);
//delete collections if exist
print("Database Name: social_network ... Showing Initial Collections: ");
printjson(collections);
if (hasCollections) {
	print("Removing all collections")
	collections_array.forEach(collection => socialnetworkDB.getCollection(collection).drop())
	printjson("Remaining collections: ["+socialnetworkDB.getCollectionNames()+"]")		
}
//create collections
collections_array.forEach(collection => socialnetworkDB.createCollection(collection));
//check collections
collections = socialnetworkDB.getCollectionNames();
print("After Creation of collections: ");
printjson(collections);
stats = socialnetworkDB.stats()
print("current stats")
printjson(stats)



