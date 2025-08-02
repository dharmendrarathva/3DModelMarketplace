import ProductModel from "../models/product.model.js";
import cloudinary from "cloudinary";

export const createProductController = async (request, response) => {
    try {
        const { 
            name,
            image,
            category,
            subCategory,
            extension,
            price,
            discount,
            description,
            more_details,
            zipFile 
        } = request.body;

        if (!name || !image[0] || !category[0] || !subCategory[0] || !extension || !price || !description ) {
            return response.status(400).json({
                message: "Enter required fields",
                error: true,
                success: false
            });
        }

        const product = new ProductModel({
            name,
            image,
            category,
            subCategory,
            extension,
            price,
            discount,
            description,
            more_details,
            zipFile: zipFile || null
        });
        

        const saveProduct = await product.save();

        return response.json({
            message: "Product Created Successfully",
            data: saveProduct,
            error: false,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

export const getAvailableProducts = async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 10; // Number of items per page
    const page = parseInt(req.query.page) || 1;     // Current page number
    const skip = (page - 1) * count;                // Calculate items to skip

    const products = await ProductModel.find({
      publish: true,
      zipFile: { $exists: true, $ne: '' }
    })
      .skip(skip)
      .limit(count)
      .sort({ createdAt: -1 }); // Optional: latest first

    return res.json({
      message: "Available product list",
      data: products,
      error: false,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export const getProductViews = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        error: true,
        success: false
      });
    }

    const product = await ProductModel.findById(productId).select("views");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      message: "Product view count fetched successfully",
      views: product.views,
      error: false,
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error",
      error: true,
      success: false
    });
  }
};


export const getSimilarProducts = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        error: true,
        success: false
      });
    }

    const currentProduct = await ProductModel.findById(productId);

    if (!currentProduct) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false
      });
    }

    const similarProducts = await ProductModel.find({
      _id: { $ne: productId }, // Exclude current product
      category: { $in: currentProduct.category }, // Match category
      publish: true,
      zipFile: { $exists: true, $ne: "" }
    }).limit(10);

    return res.json({
      message: "Similar category products",
      data: similarProducts,
      error: false,
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error",
      error: true,
      success: false
    });
  }
};














export const getLatestProducts = async (req, res) => {
  try {
    const latestProducts = await ProductModel.find({ publish: true })
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(15);              // Limit to 15

    return res.json({
      message: "Latest 15 products",
      data: latestProducts,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error",
      success: false,
      error: true,
    });
  }
};

// get random products
export const getRandomProducts = async (request, response) => {
    try {
        let { count } = request.query;

        // Default count if not provided
        count = parseInt(count) || 10;

        const randomProducts = await ProductModel.aggregate([
            { $sample: { size: count } }
        ]);

        return response.json({
            message: "Random product list",
            data: randomProducts,
            error: false,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

export const getProductController = async(request,response)=>{
    try {
        
        let { page, limit, search } = request.body 

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}

        const skip = (page - 1) * limit

        const [data,totalCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit).populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message : "Product data",
            error : false,
            success : true,
            totalCount : totalCount,
            totalNoPage : Math.ceil( totalCount / limit),
            data : data
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
//getProductByCategory
export const getProductByCategory = async(request,response)=>{
    try {
        const { id } = request.body 

        if(!id){
            return response.status(400).json({
                message : "provide category id",
                error : true,
                success : false
            })
        }

        const product = await ProductModel.find({ 
            category : { $in : id }
        }).limit(15)

        return response.json({
            message : "category product list",
            data : product,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
//getProductByCategoryAndSubCategory
export const getProductByCategoryAndSubCategory  = async(request,response)=>{
    try {
        const { categoryId,subCategoryId,page,limit } = request.body

        if(!categoryId || !subCategoryId){
            return response.status(400).json({
                message : "Provide categoryId and subCategoryId",
                error : true,
                success : false
            })
        }

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = {
            category : { $in :categoryId  },
            subCategory : { $in : subCategoryId }
        }

        const skip = (page - 1) * limit

        const [data,dataCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message : "Product list",
            data : data,
            totalCount : dataCount,
            page : page,
            limit : limit,
            success : true,
            error : false
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
//get getProductDetails
export const getProductDetails = async(request,response)=>{
    try {
        const { productId } = request.body 

        const product = await ProductModel.findOne({ _id : productId })


        return response.json({
            message : "product details",
            data : product,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//update product
export const updateProductDetails = async(request,response)=>{
    try {
        const { _id } = request.body 

        if(!_id){
            return response.status(400).json({
                message : "provide product _id",
                error : true,
                success : false
            })
        }

        const updateProduct = await ProductModel.updateOne({ _id : _id },{
            ...request.body
        })

        return response.json({
            message : "updated successfully",
            data : updateProduct,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//delete product
export const deleteProductDetails = async(request,response)=>{
    try {
        const { _id } = request.body 

        if(!_id){
            return response.status(400).json({
                message : "provide _id ",
                error : true,
                success : false
            })
        }

        const deleteProduct = await ProductModel.deleteOne({_id : _id })

        return response.json({
            message : "Delete successfully",
            error : false,
            success : true,
            data : deleteProduct
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//search product
export const searchProduct = async(request,response)=>{
    try {
        let { search, page , limit } = request.body 

        if(!page){
            page = 1
        }
        if(!limit){
            limit  = 10
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}

        const skip = ( page - 1) * limit

        const [data,dataCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt  : -1 }).skip(skip).limit(limit).populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message : "Product data",
            error : false,
            success : true,
            data : data,
            totalCount :dataCount,
            totalPage : Math.ceil(dataCount/limit),
            page : page,
            limit : limit 
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}