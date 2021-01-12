mongo = Mongo("localhost")
db = mongo.getDB("social_network")
coll = db.getCollection("Members")
arr = [["my description has changed",null,29,null,null,null,null],
["profile.about","profile.email","profile.age","profile.dayOfBirth","profile.monthOfBirth","profile.yearOfBirth","profile.gender"]]
obj = {}
for(var i=0;i<arr[0].length;i++) {
	//printjson(arr[1][i])
	if (arr[0][i]!== null) {
		var key = arr[1][i]
		obj[key] = arr[0][i]
	}	
}
var r =coll.findOneAndUpdate(
	{username: "ClairJilleen820"},
	{ $set: obj}
)
printjson(obj)

