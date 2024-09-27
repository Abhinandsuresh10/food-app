require('../models/database');
const Category = require('../models/Categorys');



// get /
// Homepage
const homepage = async(req,res) => {
    try {
     const limitNumber = 5;
     const categories = await Category.find({}).limit(limitNumber)
        
      res.render('index', {title : 'Cooking reciepe - home', categories});

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

module.exports = {
    homepage,
    loadCategory
}