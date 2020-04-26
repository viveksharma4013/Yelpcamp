var express=require("express");
var ejs=require("ejs");
var bodyParser=require("body-parser");
var app=express();
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});

var campgroundSchema=new mongoose.Schema({
	name:String,
	image: String,
	description: String
})

var Campground=mongoose.model("Campground",campgroundSchema);
//CREATE CAMPGROUNDS IN DATABASE
// Campground.create(
// 	{name:"Rishikesh", image:"https://images.thrillophilia.com/image/upload/s--YMdsOhwa--/c_fill,f_auto,fl_strip_profile,g_auto,h_600,q_auto,w_975/v1/images/photos/000/049/594/original/1556177765_1555571292_WhatsApp_Image_2019-03-19_at_10.08.52_AM_(1).jpeg.jpg.jpg?1556177765",
// 	 description:"welcome to solang valley the heaven fot trekkers"
// 	},function(err,body){
// 		if(err){
// 			console.log("We have an error");
// 		}else{
// 			console.log("New camp created!!");
// 			console.log(body);
// 		}
	
// 	}
// );

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");

app.get("/",function(req,res){	
	res.render("landing");
});

app.get("/campgrounds",function(req,res){
	//GET CAMPGROUNDS FROM DB
	Campground.find({},function(err,allcampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds",{campgrounds:allcampgrounds});		
		}				
	});
	
});

app.post("/campgrounds",function(req,res){
	//GET DATA FROM THE FORM
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var newCampGround={name:name, image:image, description:desc};
	//ADD DATA TO THE DATABASE
	Campground.create(newCampGround);
	// campgrounds.push(newCampGround);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
	res.render("new")
});

app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log("err_id");
		}else{
			res.render("show",{foundCampground:foundCampground});		
		}
	});
	
});

app.listen(3000,function(){
	console.log("I am listening");
});
