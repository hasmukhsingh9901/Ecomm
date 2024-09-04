import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';


const router = express.Router();

router.get("/", function (req, res) {
    res.render("index",{title:"Welcome to the server! 🌿",home:"Server"})
})


// router.get('/shop', isLoggedIn, function (req, res) {
//     res.render('shop')
// })

export default router