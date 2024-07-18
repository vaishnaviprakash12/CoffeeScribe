const express = require("express");
const notes = require("../backend/data/notes");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
const path=require("path");
const cors = require('cors');
const userRoutes=require("./routes/userRoutes");
const noteRoutes =require("./routes/noteRoutes")
const {notFound,errorHandler}=require("./middlewares/errorMiddleware");
connectDB();

app.use(cors());

app.use(express.json());
// // app.get("/", (req, res) => {
//   res.send("Hey, this is our home page");
// });

//  app.get("/api/notes", (req, res) => {
//    res.json(notes);
//  });


app.use("/api/users",userRoutes);
app.use("/api/notes",noteRoutes);
//deployment
const __dirname1=path.resolve();
if(process.env.NODE_ENV==="production"){
   app.use(express.static(path.join(__dirname1,'/frontend/build')));
   app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
   })
}
else {
  app.get("/",(req,res)=>{
    res.send("API is running sucessfully");
  })
}
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
