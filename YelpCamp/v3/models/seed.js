var mongoose=require("mongoose");
var Campground=require("./campground");
var Comment=require("./comment")
var data=[{
	name:"Laky lake",
	image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?crop=0.588xw:1.00xh;0.157xw,0&resize=640:*",
	description:"This is a beautiful place"
},{
	name:"Sparkly night",
	image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?crop=0.588xw:1.00xh;0.157xw,0&resize=640:*",
	description:"This is a beautiful place"
},{
	name:"Blue sky",
	image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?crop=0.588xw:1.00xh;0.157xw,0&resize=640:*",
	description:"This is a beautiful place"
}]

function seedDB(){
	Campground.deleteMany({},function(err){
		if(err){
			console.log("err");
		}
		console.log("Removed");
		data.forEach(function(data){
		Campground.create(data,function(err, campground){
			if(err){
				console.log("error");
			}
			Comment.create({
				text:"This place is great!!Just wanna apend my life here",
				author:"Vicky"
			},function(err,comment){
				if(err){
				console.log("err");
				}else{
					campground.comments.push(comment);
					campground.save();
					console.log("Created new Comment");	
				}
				
			});
			console.log("Campground Created");
		})
		});
	});
}

module.exports=seedDB;