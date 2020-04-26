var express=require("express");
var ejs=require("ejs");
var bodyParser=require("body-parser");
var app=express();
var mongoose=require("mongoose");
var Campground=require("./models/campground");
var seedDB=require("./models/seed");
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});
seedDB();
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
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log("err_id");
		}else{
			console.log(foundCampground);
			res.render("show",{foundCampground:foundCampground});		
		}
	});
	
});

app.listen(3000,function(){
	console.log("I am listening");
});
