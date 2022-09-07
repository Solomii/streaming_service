const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken")

router.get('/', verify, async (req, res) => {
  try {
   const users =  await User.find();
   res.status(200).json(users);
    
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info)
  } catch (error) {
    res.status(500).json(error);
  }
})

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

router.delete('/:id', verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
  try {
   await User.findByIdAndDelete(req.params.id), 
   res.status(200).json("User deleted");
    
  } catch (error) {
    res.status(500).json(error);
  }
  } else {
    res.status(403).json("you can delete your account")
 }
});

module.exports = router;