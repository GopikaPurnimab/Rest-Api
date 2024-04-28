const express= require("express")
const mongoose=require("mongoose")
const Product=require('./models/productmodel')
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send("Hello REST API ")
})
//retrive the product
app.get('/products',async(req,res)=>{
    try{
        const products =await Product.find({});
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})
app.get('/products/:id',async(req,res)=>{
    try{
        const{id}=req.params;
        const product =await Product.findById(id);
        res.status(200).json(product);
    }catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

//update a product
app.put('/products/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const product=await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        const updatedProduct=await Product.findById(id);
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})
//delete a product
app.delete('/products/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const product=await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`cannot find any product with Id ${id}`})
        }
        res.status(200).json(product)

    }catch(error){
        res.status(500).json({message:error.message})
    }
})
//create a product
app.post('/product',async(req,res)=>{
    try{
        const product=await Product.create(req.body)
        res.status(200).json(product);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message : error.message})

    }
})
mongoose.connect('mongodb+srv://gopikapurnimab:gopika1890@cluster0.iq9icie.mongodb.net/Rest-API?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    app.listen(3000,()=>{
        console.log("Node API is running on port 3000")
    })
    console.log("connected to mongodb")
}).catch(error=>{
    console.log(error)
})