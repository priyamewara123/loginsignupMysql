const {createUser,loginPage}=require('../controllers/signupController')
const router=require('express').Router();

router.post('/signup',createUser);
router.post('/login',loginPage);
module.exports=router;
