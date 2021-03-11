const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const saltRounds = 10;
const bcrypt = require("bcrypt");

router.get("/:userName", (req, res) => {
  User.find({ name: req.params.name }, (err, obj) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err });
    } else if (obj) {
      res.status(200).json(obj);
    } else {
      res.status(404).json({ msg: "Not found" });
    }
  });
});

router.post("/", async (req, res) => {
    if (req.body.password === req.body.verifyPassword){
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash (req.body.password, saltRounds)
  }
  new User(data).save((err, obj) => {
    if (err) {
      res.status(500).json({ msg: err });
    } else {
      res.status(200).json(obj);
    }
    save((err, obj) => {
        if (err) {
            res.status(200);
            res.send({'Status': "ERROR", 'message':"Oops! This email is already in use. Please enter another and try again" });
        } else {
            res.status(200);
            res.send({'Status': "WORKING", 'Email':req.body.email, 'Password':req.body.password});
        }
        })
         } else if (req.body.password !== req.body.verifyPassword) {
        res.status(200);
        res.send({'Status': "ERROR", 'message':"Your passwords do not match"});
         }
    }
});

// router.delete("/:userName", async(req, res) => {
//   User.deleteOne({ email }, (err, user) => {
//     if (err) {
//       console.log(err);
//       res.status(200).json({ msg: err });
//     } else {
//       res.status(200).json(obj);
//     }
//   });
// });

module.exports = router;
