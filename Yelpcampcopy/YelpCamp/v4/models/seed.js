var mongoose=require("mongoose");
var Campground=require("./campground");
var Comment=require("./comment")
var data=[
{
	name:"Laky lake",
	image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?crop=0.588xw:1.00xh;0.157xw,0&resize=640:*",
	description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
},{
	name:"Sparkly night",
	image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?crop=0.588xw:1.00xh;0.157xw,0&resize=640:*",
	description:"This is a beautiful place"
},{
	name:"Blue sky",
	image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?crop=0.588xw:1.00xh;0.157xw,0&resize=640:*",
	description:"This is a beautiful place"
}
]

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
				text:"This place is great!!Just wanna spend my life here",
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