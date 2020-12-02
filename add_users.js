mongo = Mongo('localhost');
db = mongo.getDB('social_network');

print("USER TO ADD: "+ coll[0])
addUsers(coll)
function addUsers(coll) {
if(coll!==null) {
	
		
		var user_i = coll
		var firstName = user_i[0]
		var surname = user_i[1]
		var password = user_i[2]
		var profileObject = createProfileObject(user_i[3])
		var gender = user_i[4]
		var userHandle = Math.floor(Math.random()* 1000)
		var userName = checkUniqueUser(firstName,surname,userHandle)
		print("PROFILE ARRAY TO ADD TO THE USERS PROFILE"+user_i)

		/*// left this as have a dpendency in the data to already have a username
		if (firstName!=-1) {
			firstname = db.getCollection().find({username})
		}
		if (surname!=-1) {
			
		}
		if (password!=-1) {

		}
		if (profileObject!=-1) {
			
		}
		if (gender!=-1) {
			
		}*/

		userObject = {"username":userName,"firstname":firstName,"surname":surname, "password":firstName+"2020", "profile":{profileObject}}
		db.Members.insert(userObject)
		var cursor = db.Members.find({username:userName})
		if (cursor!=null) {
			print("USER ADDED SUCCESSFULLY")
			print(JSON.stringify(cursor,null,2))
		} 
		else {
			print("User not added. Error occured!!!")
		}
	



	/*print("deleting user "+coll)
	db.getCollection(coll).drop()
	collections = db.getCollectionNames()
	print("collections: "+collections)*/
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
//for each in array[] 
// add an entry to the Members database, first arg firstname, second surname, thrid is password, fourth is an array of:
// description, email and DOB (script works out your age and adds that for the user. also the day month and year to be separated), then gender as another arg
//if an arg has -1 then dont update
