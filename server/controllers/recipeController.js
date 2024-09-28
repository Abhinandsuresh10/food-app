require('../models/database');
const Category = require('../models/Categorys');
const Recipe = require('../models/Recipes');



// get /
// Homepage
const homepage = async(req,res) => {
    try {
     const limitNumber = 5;
     const categories = await Category.find({}).limit(limitNumber)

     const latestRecipes = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
     const thai = await Recipe.find({'category' : 'Thai'}).limit(limitNumber);
     const american = await Recipe.find({'category' : 'American'}).limit(limitNumber);
     const chinese = await Recipe.find({'category' : 'Chinese'}).limit(limitNumber);

     const food = { latestRecipes , thai , american , chinese };
        
      res.render('index', {title : 'Cooking reciepe - home', categories, food});

    } catch (error) {
        res.status(500).send({message: error.message || 'error occured'})
    }
    
}


//get categories...

const loadCategory = async(req, res) => {

    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber)
           
         res.render('categories', {title : 'Cooking reciepe - Categories', categories});
   
       } catch (error) {
           res.status(500).send({message: error.message || 'error occured'})
       }

}

//single recipe / :id


const loadSingleRecipe = async(req,res) => {
    try {
        const receId = req.params.id;
        const recipe = await Recipe.findById(receId);

      res.render('recipe', {title : 'cooking recipe - recipe', recipe})  
    } catch (error) {
        res.render(500).send({message: error.message || 'error occured'})
    }
}


//get categories by id...

const loadCategoryById =  async(req, res) => { 

    try {
      let categoryId = req.params.id;
      const limitNumber = 20;
      const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);
      res.render('categories', { title: 'Cooking Blog - Categoreis', categoryById } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  }


  //recipe searching...

  const searchRecipe = async(req,res)=> {
    try { 
      let searchTerm = req.body.searchTerm;

      let recipe = await Recipe.find({$text : {$search : searchTerm , $diacriticSensitive : true}});
      
      res.render('search', {title : 'Cooking Blog - search' , recipe})  
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  }

  //explore-latest...

  const exploreLatest = async(req,res)=> {
    try {

        const limitNumber = 20;
        const recipe = await Recipe.find({}).sort({_id: -1}).limit(limitNumber)
        res.render('explore-Latest', {title : 'cooking recipe - recipe', recipe})    
    } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
    }
  }


  //explore-random...

  const exploreRandom = async(req,res)=> {
    try {
         let count = await Recipe.countDocuments();
         let random = Math.floor(Math.random() * count);
         let recipe = await Recipe.find().skip(random).limit(1).exec()

        res.render('explore-Random', {title : 'cooking recipe - recipe', recipe});   
    } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
    }
  }

  //submitRecipe load....

  const submitRecipe = async(req,res) => {
    try {

      const infoErrorObj = req.flash('infoErrors');
      const infoSubmitObj = req.flash('infoSubmit');
        res.render('submit-recipe', {title : 'cooking recipe - submitPage' , infoErrorObj , infoSubmitObj});
    } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
    }
  }

  //submitRecipe Post...

  
  const submitRecipeOnPost = async(req,res) => {
    try {

       const {name , description , email , incredients , category } = req.body;

       let imageUploadFile;
       let uploadPath;
       let newImageName;

       if(!req.files || Object.keys(req.files).length === 0) {
        console.log('no files are uploaded');
        
       } else {
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;


        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.satus(500).send(err);
        });


       }

       const newRecipe = await Recipe({
        name: name,
        description: description,
        email: email,
        incredients: incredients,
        category: category,
        image: newImageName
       });

       await newRecipe.save();

        req.flash('infoSubmit','Recipe has been added. ');
        res.redirect('/submit-recipe');
    } catch (error) {
        req.flash('infoError', error);
        res.redirect('/submit-recipe');
    }
  }
  


module.exports = {
    homepage,
    loadCategory,
    loadSingleRecipe,
    loadCategoryById,
    searchRecipe,
    exploreLatest,
    exploreRandom,
    submitRecipe,
    submitRecipeOnPost
}


// async function insertDummyCategoryData() {
//     try {
//       await Category.insertMany([
//             {
//                 "name" : "Thai",
//                 "image" : "thai-food.jpg"
//             },
//             {
//                 "name" : "American",
//                 "image" : "american-food.jpg"
//             },
//             {
//                 "name" : "Chinese",
//                 "image" : "chinese-food.jpg"
//             },
//             {
//                 "name" : "Mexican",
//                 "image" : "mexican-food.jpg"
//             },
//             {
//                 "name" : "Indian",
//                 "image" : "indian-food.jpg"
//             },
//             {
//                  "name" : "Spanish",
//                  "image" : "spanish-food.jpg"
//              }
//         ]);

//     } catch (error) {
//         console.log(error.message)
//     }
// }

// insertDummyCategoryData();

