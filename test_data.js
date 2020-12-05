mongo = Mongo("localhost")
db = mongo.getDB("social_network")
membersColl = db.getCollection("Members")
cursor = membersColl.find()
//random = randomNumber(10,100)

cursor.forEach(function(user){
	friendsObject = user.friends
	friends = Object.keys(friendsObject)
	anyFriends = friends.length !== 0
	//
	//if no members show in the members collection that dont have their username on
	if(!anyFriends){
		date = getDateTime()
		random = randomNumber(1,100)
		var cursor = membersColl.find()
		cursor.limit().skip(random).forEach(function(c){
			//friendObject = {id: c.username, date_added: date}
			

			//friends_array = user.friends
			//friends_array.concat([{friendId:c.username}]) 
			membersColl.update({
				username: user.username
			},{
				$push: {
					friends: {$each:[{'id':c.username,'name':c.firstname, 'date_added':date}]}}})
//printjson(user)
			/*user.friends.aggregate({
				$addFields: {friend:{add:[friendObject]}}
			})*/
			
			//printjson(random +"plus "+c.username)
		})
		//printjson(user.friends) /////HAVE GOT SRTCK HERE. CANNOT ADD THE FRIEND OBJECT
		//Or if i add friends to the users collection - then if this user has no friend in their embedded collection called friends
		for (var i=0;i<=random; i++){

			//for this random number of tiemes ... addSome friend where we pick some user
			//from a cursor (below in addFriend) if not already in the friends collections
		}
	}

})

membersColl = db.getCollection("Members")
cursor = membersColl.find()
cursor.forEach(function(user){
	printjson(user)
})
function randomNumber(from,to){
	return Math.floor(Math.random() * to) + from
}
function addFriend(user){
	//var cursor = 
}

function getDateTime(){
	var currentdate = new Date(); 
var datetime = "Date: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
                return datetime
}
