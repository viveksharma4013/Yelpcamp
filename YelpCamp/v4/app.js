var express=require("express");
var ejs=require("ejs");
var bodyParser=require("body-parser");
var app=express();
var mongoose=require("mongoose");
var Campground=require("./models/campground");
var seedDB=require("./models/seed");
var User=require("./models/user");
var Comment=require("./models/comment")
var passport=require("passport")
var LocalStrategy=require("passport-local");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true,useUnifiedTopology: true});
app.use(express.static(__dirname+"/public"));
seedDB();
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");

app.use(require("express-session")({
	secret:"Once again I won it!!",
	resave:false,
	saveunInitialized:false
}))
app.use(passport.initialize())
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get("/",function(req,res){	
	res.render("landing");
});

app.get("/campgrounds",function(req,res){
	//GET CAMPGROUNDS FROM DB
	Campground.find({},function(err,allcampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/campgrounds",{campgrounds:allcampgrounds});		
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
	res.redirect("campgrounds/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
	res.render("comments/new")
});

app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log("err_id");
		}else{
			console.log(foundCampground);
			res.render("campgrounds/show",{foundCampground:foundCampground});		
		}
	});
	
});

app.get("/campgrounds/:id/comments/new",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log("error");
		}else{
			res.render("comments/new",{campground:campground})	
		}
	});
});

app.post("/campgrounds/:id/comments",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err)
			res.redirect("/campgrounds")
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err)
					res.redirect("/")
				}else{
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/'+campground._id);
				}
			})
		}
	})
})

app.get("/register",function(req,res){
	res.render("register")
});

app.post("/register",function(req,res){
	var newUser=new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log("error");
			res.render("/register");
		}else{
			passport.authenticate("local")(req,res,function(){
				res.redirect("/campgrounds")
			})
		}
	})
})

app.get("/login",function(req,res){
	res.render("login")
})
app.post("/login",passport.authenticate("local",{
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}),function(req,res){
	
});

app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campgrounds");
})

app.listen(3000,function(){
	console.log("I am listening");
});
