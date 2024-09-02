import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';


const router = express.Router();

router.get("/", function (req, res) {
    let error = req.flash("error");
    res.render("index", { error })
})


router.get('/shop', isLoggedIn, function (req, res) {
    res.render('shop')
})

export default router