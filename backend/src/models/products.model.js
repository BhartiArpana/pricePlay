import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:[true,'Product name required'],

    },
    image:{
        type:String,
        required:[true, 'image required ']
    },
    price:{
        type:String,
        required:[true,'price required']
    },
    sellingPrice:{
        type:String,
        required:[true,'selling price required']
    },
    description:{
        type:String,
        required:[true,'description required']
    },
    tag:{
        type:String,
        enum:[]
    },
    title:{
      type:String
    }
})

const productModel = mongoose.model('Products',productSchema)

export default productModel