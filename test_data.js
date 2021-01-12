mongo = Mongo("localhost")
db = mongo.getDB("social_network")
membersColl = db.getCollection("Members")
cursor = membersColl.find()
cursor.forEach(function(user){
	addFriend(user)
})
//then add messages for each user from their corresponding friends list
membersColl = db.getCollection("Members")
cursor = membersColl.find()
cursor.forEach(function(user){
	addMessageData(user)
})
////Functions
function randomNumber(from,to){
	return Math.floor(Math.random() * to) + from
}
function addFriend(user){
	friendsObject = user.friends
	printjson(user)
	print("has friends:")
	printjson(friendsObject)
	friends = Object.keys(friendsObject)
	anyFriends = friends.length !== 0
	if(!anyFriends){
		date = getDateTime()
		random = randomNumber(1,100)
		var cursor = membersColl.find()
		cursor.limit().skip(random).forEach(function(c){
			membersColl.update({
				username: user.username
			},{
				$push: {
					friends: {$each:[{'id':c._id, 'username':c.username, 'name':c.firstname, 'date_added':date}]}}})

		})
	}
}
function  addMessageData(user){
	//messages need to go in messages and then change the structure of the memebers object nested in Members

	random = randomNumber(0,48)
	date = getDateTime()
var cursor = membersColl.find()
cursor.forEach(function(member) {
	usersFriends = member.friends
	var friends = usersFriends.map(function(friend) {return friend}) // change to an array to be able to call for each
	var friendsIdArray = []
	var friendsObj = {}
		friends.forEach(function(friend) {
			friendsObj.id = friend.id
			friendsIdArray.push(friendsObj)
			
		})
		
		var r = db.Messages.insert({
			host_id: member._id, recipients:friendsIdArray
		})	
	//test
	print(r)
	//printjson({host_id:member._id, recipients:friendsIdArray})
})

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