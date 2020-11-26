mongo = Mongo('localhost');
db = mongo.getDB('social_network');
deleteCollection(coll)
function deleteCollection(coll) {
if(coll!==null) {
	print("deleting user "+coll)
	db.getCollection(coll).drop()
	collections = db.getCollectionNames()
	print("collections: "+collections)
}
}

