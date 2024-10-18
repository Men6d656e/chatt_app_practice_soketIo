import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import http from 'http';

dotenv.config({
    path : './.env'
})


const app = express();

const server = http.createServer(app);


app.use(cors({
    origin: "*",
    Credential : true,

}))


app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended : true}));
app.use(express.static("public"));



const connectDb = async function(){
    try {
        const connection = await mongoose.connect(`${process.env.MONGOURL}/whatsappBrodcast`);
        console.log(`MOngodb is connected: ${connection.connection.host}`);
    } catch (error) {
        console.log(error,"MOngoose connection error");
        process.exit(1);
    }
}


connectDb()
.then(()=>{
    server.on("error: " , (error)=>{
        console.log("ERROR : " , error);
    })
    server.listen(process.env.PORT || 8000 , () => {
        console.log(`server started at port: ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDb connection error !!!" , error)
})


// routes
app.get('/' , (req ,res)=> {
    return res.json( "message")
})