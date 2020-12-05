mongo = Mongo('localhost');
db = mongo.getDB('social_network')
//alter user base to add more users
//don forget!! must call: "mongo first-names.json create_users.js" in command line
userBase = 100
months = ["january","february","march","april","may,","june","july","august","september","october","november","december"]
userObject = {}
userObjectArray = []
profileObject = {}
friendsObject = {}
for (var i=0;i<=userBase;i++) {
	var firstName = names[Math.floor(Math.random() * names.length)]
	var surname = names[Math.floor(Math.random() * names.length)]
	var userHandle = Math.floor(Math.random()* 1000)
	var userName = checkUniqueUser(firstName,surname,userHandle)
	 
	if (userName || userName != null) {
		profileObject = createProfileObject()
		userObject = {"username":userName,"firstname":firstName,"surname":surname, "password":firstName+"2020", "profile":{profileObject}, "friends":[]}
		userObjectArray.push(userObject)
		db.Members.ensureIndex({userName: 1}, {unique: true}); //may need to change to create index: https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/#db.collection.createIndex
		printjson(db.Members.getIndexes()) 
	}
}
printjson(userObjectArray)
db.Members.drop()
db.Members.insert(userObjectArray);
cursor = db.Members.find()
cursor = cursor.toArray()
cursor.forEach(member => print(JSON.stringify(member,null,2)) )


function createProfileObject() {
	var age = Math.floor(Math.random() * 80)
	var currentYear = new Date().getFullYear()
	var yearOfBirth = currentYear - age
	var monthOfBirth = Math.floor(Math.random()* months.length+1)
	
	var dayOfBirth = 0
	if (monthOfBirth === "april" || monthOfBirth === "june" || monthOfBirth === "september" || monthOfBirth === "november" || monthOfBirth === 4 || monthOfBirth === 6 || monthOfBirth === 9 || monthOfBirth === 11)
		dayOfBirth = Math.floor(Math.random()*30+1)
	else if (monthOfBirth === "february" || monthOfBirth === 2)
		dayOfBirth = Math.floor(Math.random()*28+1)
	else
		dayOfBirth = Math.floor(Math.random()*31+1)
	var DOB = dayOfBirth 
	DOB = monthOfBirth
	print(DOB)
	userObject =  {
			"about":"Description about the user",
			"email": userName+"gmail.com",
			"age":age,
			"dayOfBirth":dayOfBirth,
			"monthOfBirth":monthOfBirth,
			"yearOfBirth":yearOfBirth,
			"gender": ""
		}
	return userObject

}
function checkUniqueUser(firstName, surname, userHandle) {
	userName = firstName+surname+userHandle
	userCollection = db.getCollection("Usernames");
	if (userCollection.find({handle:userName}) === userName) {
		print("exists")
		userHandle+1
		checkUniqueUser(firstName,surname,userHandle)
	} else {
		print("user name check ok: ")
		print(userName)
		return userName
		}
	}	


/*function randomDate(start, end) {
  var date = new Date(+start + Math.random() * (end - start));
  return date;
}*/