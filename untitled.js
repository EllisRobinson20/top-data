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
	random = randomNumber(0,48)
	date = getDateTime()
var cursor = membersColl.find()
cursor.forEach(function(member) {
	usersFriends = member.friends
	var friends = usersFriends.map(function(friend) {return friend}) // change to an array to be able to call for each
		friends.forEach(function(friend) {
			
			member.messageThreads.forEach(function(message){
				//print(message.friend_username == friend.username)
				if (message.friend_username === friend.username) {
					//append the array
					message.message_context.push(message.message_context)
					print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
					printjson(message)
					membersColl.update({
				username: user.username
			},{
				$push: {
					message_context}})
				} 
			})
			
			//var friendContextExsists = membersColl.find({$and:[{"messageThreads.thread_id": friend.id}, {"messageThreads.thread_id": friend}] })	
			//createMessageContext()	
			function createMessageContext() {
				membersColl.update({
				username: user.username
			},{
				$push: {
					messageThreads: {$each:[{'thread_id':friend.id, 'friend_username':friend.username, 'date_added':date, 'message_context':[messages[randomNumber(0,48)]]}]}}})
				
			}
			
		})	
		printjson(user.messageThreads)
})
print("<<<<<<<<<<<<<<<<< users are: >>>>>>>>>>>>>>>>>>>>>>")
printjson(user)
print("<<<<<<<<<<<<<<<<< threads are: >>>>>>>>>>>>>>>>>>>>>>")
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