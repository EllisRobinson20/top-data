//object version of the schema
var Members = {
	$schema: "http://social_network.co/schema",
	title: "Members",
	description: "collection of current Member objects",
	type: "object",
	required: ["username","password"],
	properties: {
		username: {"description":"Unique ID","type":"string", "minLength":4, pattern: "^.{3,20}[0-9]{1,4}$"},
		firstname: {"type":"string","minLength":2},
		surname: {"type":"string","minLength":2},
		password: {"type":"string", "minLength":8, "maxLength":30},
		profile:{
			description:"additional profile information",
			type: "object",
			required: ["email"],
			properties:{
				about:{"description":"Description about the user","type":"string"},
			email:{"type":"string",pattern: "^.+\@.+$",},
			age:{"type":"number","minimum":13},
			dayOfBirth:{"type":"number","minimum":1},
			monthOfBirth:{"enum":["January","February","March","April","May","June","July","August","September","October","November","December"]},
			yearOfBirth:{"type":"number"},
			gender:{"enum":["male","female","prefer not to say"]}
			}
		},
		friends:{
			description:"an array of the users friends",
			type:"array",
			items:[
				{
					description:"friend information",
					type:"object",
					required: ["id","username","name","date_added"],
					properties:
						{
							id:{"description":"the id of the friend", "bsonType":"objectId"},
							username:{"description":"username of friend","type":"string","minLength":4},
							name:{"description":"name of friend","type":"string","minLength":2},
							date_added:{"description":"the date the friend was added to friends list", "type":"string"},
							reciprocated:{"description":"if true the friend has added user in return", "type":"boolean"}
						}
					
				}
			]
		},
		messages:{
			description:"An array to store messages to user",
			type:"array",
			items:[{description:"the object id of the message thread goes here", bsonType:"objectId"}]
		}	
	}
}
var Usernames = {
	$schema: "http://social_network.co/schema",
	title:"Usernames",
	description: "collection of current usernames to ensure unique uers handles",
	type: "object",
	required: ["username"],
	properties:{
		username:{description:"existing userhandle is required", bsonType:"string", pattern: "^.{3,20}[0-9]{1,4}$"} // enforce strings with regaex pattern. also found online eg that does email
	}
}

var Messages = {
	$schema: "http://social_network.co/schema",
	title:"Messages",
	description:"object to store messages between user and friends",
	type:"object",
	required:["host_id","recipients"],
	properties:{
		host_id: {
			description:"id of the host is required", 
			bsonType: "objectId"
		},
		recipients: {
			description:"additional members",
			type: "array",
			items:[{ 
				type:"object",
				properties: {
					id:{description:"id of recipient",bsonType:"objectId"}
					}	
				}]
			},
		messages:{
			description:"message array",
			type:"array",
			items:[{
			description:" the message body",
			 type: "object",
			 required:["sender","post"],
			 properties:{
			 	sender:{description:"id of the sender", bsonType:"objectId"},
			 	post:{description:"message sent by the user", type:"string"}
			 	}	 
			}]
		}
	}	
}