import express, { Router } from 'express';
import cors from 'cors'; //use to send data between two diferrent ports
import bodyParser from 'body-parser';

import mongoose from "mongoose"
import bcrypt from "bcryptjs"
////components

import Connection from './database/db.js';
import router from './routes/route.js';

const saltRounds = 10

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const app= express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', router);


const User = new mongoose.model("User", userSchema)
// var hp=null;


// app.post("/login", (req, res) => {
//     const { email, password } = req.body
//     User.findOne({ email: email }, (err, user) => {
//         if (user) {
//             bcrypt.compare(password, user.hp, function (error, isMatch) {
//                 if (error) {
//                     throw error
//                 } else if (!isMatch) {
//                     res.send({ message: "Password didn't match" })
//                 } else {
//                     res.send({ message: "Login Successfull", user: user })
//                 }
//             })
//         }
//         else {
//             res.send({ message: "User not registered" })
//         }
        /*if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }*/
//     })
// })

// app.post("/register", (req, res) => {

//     const { name, email, password } = req.body
//     hp;
//     bcrypt.genSalt(saltRounds, function (saltError, salt) {
//         if (saltError) {
//             throw saltError
//         } else {
//             bcrypt.hash(password, salt, function (hashError, hash) {
//                 if (hashError) {
//                     throw hashError
//                 } else {
//                     hp = hash
//                 }
//             })
//         }
//     })

//     User.findOne({ email: email }, (err, user) => {
//         if (user) {
//             res.send({ message: "User already registerd" })
//         } else {
//             console.log(hp);
//             const user = new User({
//                 name,
//                 email,
//                 hp
//             })
//             user.save(err => {
//                 if (err) {
//                     res.send(err)
//                 } else {
//                     res.send({ message: "Successfully Registered, Please login now." })
//                 }
//             })
//         }
//     })

// })

app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 



const port=8000;
app.listen(port,() => console.log('server is running'));

Connection();