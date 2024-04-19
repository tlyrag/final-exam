const router = require('express').Router();
let Book = require('../models/dbModel.js');

/// Just to check server
router.route("/health-check").get((req,res)=> {
    console.log(req.body)
    res.json({
        ok:true,
    })

})


/// Get alll books
router.route("/").get(async (req,res) => {
    try {
        console.log(`Getting books`)
        //const bookList = await Activity.activities.find()
        const bookList = await Book.bookrecords.find();
        res.json(bookList)
        
    } catch(err) {
        res.json(`Failed to retrieve books list`)
    }

})

/// Get book by id
router.route("/:id").get(async (req,res) => {
    try {
        const id = req.params.id;
        const book = await Book.bookrecords.findById(id)
        res.json(book)
        
    } catch(err) {
        res.json(`Failed to retrieve Book from database`)
    }

})

/// Add book
router.route("/add").post(async (req,res) => {
    console.log(req.body)
    const title = req.body.title;
    const author = req.body.author;
    const description = req.body.description;

   
    const newBook = new Book.bookrecords({
        title,
        author,
        description
    })

    try {
        await newBook.save();
        res.json(`New Activity added to DB ${newBook._id}`)
    } catch(err) {
        res.json("Failed to save the new activity")
    }
    

})

/// Update Book by id
router.route("/:id").post(async (req,res) => {
    try{
        const id = req.params.id
        const updateData = req.body
        console.log(id)
        const updatedActivity = await Book.bookrecords.findByIdAndUpdate(id, updateData, {
            new: true, 
            runValidators: true 
        });
      
        res.json(`ID successfully updated`)
    } catch(err)  {
        console.log(`Failed to update Data: ${err}`)
    }
})


router.route("/:id").delete(async(req,res) => {
    const id = req.params.id;
    

    try {
        await Book.bookrecords.findByIdAndDelete(id)
        res.json(`${id} Was deleted from database`)
    } catch (err) {
        console.log(`Failed to delete ${id} from database`)
    }


});


module.exports = router;