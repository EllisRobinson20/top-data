mongo = Mongo('localhost');
db = mongo.getDB('social_network');
coll = ["craig","smith","password",["message about me", "email@gmail.com", 20,6,1990,"male"]]
print("USER TO ADD: "+ coll[0])
addUsers(coll)
function addUsers(coll) {
if(coll!==null) {	
		var user_i = coll
		var firstName = user_i[0]
		var surname = user_i[1]
		var password = user_i[2]
		var profile = createProfileObject(user_i[3])
		var gender = user_i[4]
		var userHandle = Math.floor(Math.random()* 1000)
		var userName = checkUniqueUser(firstName,surname,userHandle)
		print("PROFILE ARRAY TO ADD TO THE USERS PROFILE"+user_i)

		
		userObject = {"username":userName,"firstname":firstName,"surname":surname, "password":firstName+"2020", profile, "friends":[], "messages":[]}
		db.Members.insert(userObject)
		var cursor = db.Members.find({username:userName})
		if (cursor!=null) {
			print("USER ADDED SUCCESSFULLY")
			print(JSON.stringify(cursor,null,2))
		} 
		else {
			print("User not added. Error occured!!!")
		}
}
}
function createProfileObject(user_profile_array) {
	var currentYear = new Date().getFullYear()
	print("PROFILE ARRAY"+user_profile_array)
	var profile_object =  {

			"about":user_profile_array[0],
			"email":user_profile_array[1],
			"age":parseInt(currentYear)  - parseInt(user_profile_array[4]),
			"dayOfBirth":user_profile_array[2],
			"monthOfBirth":user_profile_array[3],
			"yearOfBirth":user_profile_array[4],
			"gender": user_profile_array[5]
		}
	return profile_object
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

