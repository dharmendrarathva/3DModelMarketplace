import { Router } from 'express'
import auth from '../middleware/auth.js'
import { createProductController,getProductController,getProductByCategory,getProductByCategoryAndSubCategory,getProductDetails,updateProductDetails,deleteProductDetails,searchProduct,getRandomProducts,getAvailableProducts,getLatestProducts,getSimilarProducts,getProductViews } from '../controllers/product.controller.js'
import { admin } from '../middleware/Admin.js'

const productRouter = Router()

productRouter.post("/create",auth,admin,createProductController)
 productRouter.post('/get',getProductController)
productRouter.post("/get-product-by-category",getProductByCategory)
productRouter.post('/get-pruduct-by-category-and-subcategory',getProductByCategoryAndSubCategory)
 productRouter.post('/get-product-details',getProductDetails)


productRouter.put('/update-product-details',auth,admin,updateProductDetails)


 productRouter.delete('/delete-product',auth,admin,deleteProductDetails)


 productRouter.post('/search-product',searchProduct)

 productRouter.get('/get-random-products', getRandomProducts)

 productRouter.get('/get-available-products', getAvailableProducts);

 productRouter.get('/get-latest-products', getLatestProducts);
 
productRouter.post('/get-similar-products', getSimilarProducts);

productRouter.get('/product/:productId/views', getProductViews);



 

export default productRouter


