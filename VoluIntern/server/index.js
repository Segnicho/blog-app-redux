import express from "express";
import dotenv from 'dotenv'
import mongoose from 'mongoose';



dotenv.config()

const app = express();
const connectDB = () =>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Connected to the database");
    }).catch((err)=>{
        console.log(err);
    })
}

// middlewares
app.use(express.json())
app.use('/v1/api/auth', authRoutes)
app.use('/v1/api/users', userRoutes)
app.use('/v1/api/post', userRoutes)
app.use('/v1/api/post', userRoutes)




app.listen(5000, ()=>{
    connectDB();
    console.log("Connected to the backend");
})
