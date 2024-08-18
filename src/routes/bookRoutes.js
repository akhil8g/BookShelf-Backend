const router =require('express').Router();
const bookController = require('../controllers/bookController')

router.get('/readBook',bookController.readBook);

router.get('/readSpecificBook/:title',bookController.readSpecificBook);

router.post('/createBook',bookController.createBook);

router.put('/updateBook/:id',bookController.updateBook);

router.delete('/deleteBook/:id',bookController.deleteBook);

router.get('/readWishlist',bookController.readWishlist);

router.post('/addToWishlist',bookController.addToWishlist);

router.delete('/removeWishlist/:id',bookController.removeWishlist);

module.exports = router;