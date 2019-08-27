const express = require("express");
const productRouter = express.Router();
const ProductController = require("../controller/productController");
const Product = require("../models/product");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const authenticate = require("../authenticate");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

productRouter.post('/updateproduct', (req, res)=>{

  Product.update({_id:req.body._id},  req.body, (err, product)=>{

    if(!err){
      res.json({success:true});
    }

  });

})

productRouter.post(
  "/new",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    console.log("hello");
    next();
  },
  upload.single("file"),
  (req, res) => {
    if (req.file) {
      req.body.imgSrc = req.file.path;
    }
    req.body.user = req.user;
    ProductController.saveProduct(req.body, (err, product) => {
      if (err) {
        res.json({ err: err });
      } else if (product._id) {
        res.json({ success: true });
      }
    });
  }
);

productRouter.get("/get_all_products", (req, res) => {
  Product.find({}, (err, products) => {
    res.json(products);
  });
});

// productRouter.get("/best_sales", (req, res, next) => {
//   Product.find({ sales: { $gt: 5 } }, (err, products) => {
//     if (err) return next(err);
//     res.setHeader("content-type", "application/json");
//     res.statusCode = 200;
//     res.json({
//       message: "Products fetched successfully",
//       success: true,
//       products
//     });
//   });
// });

productRouter
  .route("/:productId")
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Product.findByIdAndDelete(req.params.productId, (err, deletedItem) => {
        if (err) return next(err);
        console.log(deletedItem);
        fs.unlink(deletedItem.imgSrc, err => {
          if (err) return next(err);
          res.setHeader("content-type", "application/json");
          res.statusCode = 200;
          res.json({
            success: true,
            message: "product successfully deleted",
            deletedItem
          });
        });
      });
    }
  );

module.exports = productRouter;
