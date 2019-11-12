const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Author = require('../models/author')
const Book = require('../models/book')
const uploadPath = path.join('public',Book.coverImageBasePath)

const imageMimeTypes = ['image/jpeg','image/png','images/gif']
 const upload = multer({
  dest : uploadPath,
  fileFilter :(req,file,callback) => {
    callback(null,imageMimeTypes.includes(file.mimetype))
  }
})

// ALL Books Route
router.get('/' ,async (req,res) => {
  try{

    const books = await Book.find({})
    res.render('books/index',{
      books : books,
      searchOptions : req.query
    })
  }
  catch{
    res.redirect('/')
  }
   
   
})

// New Book route
router.get('/new',async (req,res)=> {
  // try{
  //   const authors  = await Author.find({})
  //   console.log(authors)
  //   const book  = new Book()
  //   res.render('books/new',{
  //       authors : authors,
  //       book:book
  //   }
  //   )}
  // catch{
  //   res.redirect('/books')
  // }

  renderNewPage(res,new Book())

})

// create Book Route
// using async and await

// For multer using technique
// upload.single('cover') taking cover same as we have saved in form name="cover"

router.post('/', upload.single('cover') ,async (req,res)=>{
  
  const filename = req.file != null ? req.file.filename : null
  const book = new Book({
    title : req.body.title,
    author:req.body.author,
    publishDate : new Date(req.body.publishDate),
    pageCount : req.body.pageCount,
    coverImageName : filename,
    description : req.body.description
    
  })
  try{

    const newBook = await book.save()
    // console.log('in book saving try')
    res.redirect('/books')
  }
  catch (error){
    // console.log('in book saving cach')
    // console.log(error)
    if(book.coverImageName != null)
    {
      removeBookCover(book.coverImageName)
      // this is because if error comes in form on create due the othe field then this image gets uploadd and hence we need to remove this image
    }
    renderNewPage(res,book,true)
  }
})

function removeBookCover(filename)
{
  fs.unlink(path.join(uploadPath,filename) ,err=> {
    if(err) console.log(err);
  })
}
async function renderNewPage(res,book,hasError = false)
{
  try{
    const authors  = await Author.find({})
    // console.log(authors)
    const params = {
      authors : authors,
      book:book
  }
    if(hasError ){
      params.errorMessage = 'Error createing Book'
      console.log(hasError+'rerghjhgf')
    }
  
  res.render('books/new',params)
  }
  catch{
    res.redirect('/books')
  }

}

module.exports = router