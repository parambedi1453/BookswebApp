const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// ALL Authors Route
router.get('/' ,async (req,res) => {

    let searchOptions = {}
    if(req.query.name != null && req.query.name != '')
    {
        searchOptions.name = new RegExp(req.query.name ,'i')//i menetioning that case insensitive
    }
    try {

        const authors = await Author.find(searchOptions)
        res.render('authors/index',{
            authors : authors,
            searchOptions:req.query
        })
        
    } catch {
        res.redirect('/')
    }
   
})

// New Author route
router.get('/new',(req,res)=> {
    res.render('authors/new' ,{author : new Author() })
})

// create Athor Route
// using async and await

router.post('/',async (req,res)=>{
    const author = new Author({
        name : req.body.name
    })
    try
    {
        const newAuthor =  await author.save()
        res.redirect(`authors`)
    }catch{

        res.render('authors/new',{
                        author : author,
                        errorMessage : 'Error creating author'
                    })
    }
})

// using simple callback functions in 

// router.post('/',(req,res)=>{
//     const author = new Author({
//         name : req.body.name
//     })
//     author.save((err,newAuthor) => {
//         if(err){
//             res.render('authors/new',{
//                 author : author,
//                 errorMessage : 'Error creating author'
//             })
//         }
//         else{
//             res.redirect(`authors`)
//         }
//     })
// })


module.exports = router