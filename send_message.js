mongo = Mongo('localhost');
db = mongo.getDB('social_network');
sender = "LoreenMicaela328"//f6b7
recipients = ["FlorenceTessi84","CordeliaTracee533"]//f6b6
obj = {}
userId = null
message = "We have a new message"

user = db.Members.findOne({username:sender})
userId = user._id
recipientArr = []
recipients.forEach(function(recipient){
	r = db.Members.findOne({username:recipient})
	obj["_id"] = r._id
	recipientArr.push(obj) 
})
res = db.Messages.aggregate([{$match:{$and:[{host_id:userId},{recipients:recipientArr}]}}])
if (res._batch.length <= 0) {
	//create a Message thread add the host and recipients
	r =db.Messages.insert({
			host_id: userId, recipients:recipientArr
		})
	//test
	print("Message object inserted result:")
	printjson(r)
	res = db.Messages.aggregate([{$match:{$and:[{host_id:userId},{recipients:recipientArr}]}}])
	print("result from create message object:")
	printjson(res._batch)
	//send message
	result = db.Messages.findOneAndUpdate(
	{
		host_id:userId, recipients:recipientArr
	},
	{$push: {messages: {$each:[{sender:userId, post:message}]}}
})

	print("result from send new message:")
	printjson(result)
	// dont forget to add the message to the recipients embedded message object (ie their inbox)
} else {
	print("ID OF THE MESSAGE OBJECT")
	var messageId = res._batch[0]._id
	printjson(res._batch)
	//update message only as the message thread already exists
	result = db.Messages.update(
	{
		host_id:userId, recipients:recipientArr
	},
	{$push: {messages: {$each:[{sender:userId, post:message}]}}
})
	print("result from update existing message:")
	printjson(result.nModified)

	if (result.nModified){
		recipients.forEach(recipient => {
			updateResult = db.Members.update({username:recipient}, {$push: {messages:[messageId]} })
			print("result from update of user inbox: ")
			printjson(updateResult)
		} )
		
	}
	
}
// else if the batch returns a message thread, then just update the message array in existing
print("Recipient array:")
printjson(recipientArr)

//printjson(res._batch)
// thread already???
// if not creat one? 

//NOTES this only checks the hosts groups. It should check the recipients too for an existing context