mongo = Mongo("localhost")
db = mongo.getDB("social_network")
membersColl = db.getCollection("Members")
cursor = membersColl.find()
cursor.forEach(function(user){
	friendsObject = user.friends
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