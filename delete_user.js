mongo = Mongo("localhost")
db = mongo.getDB("social_network")
if (doc!=null) {
	var r = db.Members.deleteOne({username:doc})
	print("doc contains "+ doc+". Result: ")
	printjson(r)
}
