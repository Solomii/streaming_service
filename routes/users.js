const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken")

router.put('/:id', verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.user.password) {
     req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString();
   }

  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });

    res.status(200).json(updateUser);
    
  } catch (error) {
    res.status(500).json(error);
  }
  } else {
    res.status(403).json("you can update your account")
 }
});


module.exports = router;