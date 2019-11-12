const express = require('express')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')

// ALL Books Route
router.get('/' ,async (req,res) => {
    res.send('All Books')
   
})

// New Book route
router.get('/new',async (req,res)=> {
  try{
    const authors  = await Author.find({})
    console.log(authors)
    const book  = new Book()
    res.render('books/new',{
        authors : authors,
        book:book
    }
    )}
  catch{
    res.redirect('/books')
  }

})

// create Book Route
// using async and await

router.post('/',async (req,res)=>{
   res.send('create Books')
})


module.exports = router