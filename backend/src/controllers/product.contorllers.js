import productModel from "../models/products.model.js";
import {ImageKit, toFile} from '@imagekit/nodejs'



const imagekit= new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

export async function addProduct(req,res){
     const {productName,price,sellingPrice, description,title,tags} = req.body

     const file=await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:'Test',
        folder:'cohort_insta_clone'
    })

     const product  = await productModel.create({
        productName,
        image:file.url,
        price,
        sellingPrice,
        description,
        title,
        tags
     })
     res.status(201).json({
        message:'Product added successfully!',
        product
     })
}

export async function getAllProduct(req,res){
    try{
        const allProducts = await productModel.find()
        res.status(200).json({
            message:'Products fetched successfully!',
            allProducts
        })
    }catch(err){
        res.status(400).json({
            message:err
        })
    }
}