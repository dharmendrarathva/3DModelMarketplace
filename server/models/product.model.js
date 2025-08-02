import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    image : {
        type : Array,
        default : []
    },
    category : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'category'
        }
    ],
    subCategory : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'subCategory'
        }
    ],
    extension : {
        type : String,
        default : ""
    },
    price : {
        type : Number,
        default : null
    },
    discount : {
        type : Number,
        default : null
    },
    description : {
        type : String,
        default : ""
    },
    more_details : {
        type : Object,
        default : {}
    },
    publish : {
        type : Boolean,
        default : true  
    },
    zipFile: {
    type: Object,
    default: null
},
views: {
    type: Number,
    default: 0
}


},{
    timestamps : true
})



productSchema.index(
    { name: "text", description: "text" },
    { weights: { name: 10, description: 5 } }
  );


const ProductModel = mongoose.model('product',productSchema)

export default ProductModel