const mongoose = require("mongoose");

const ListedSchema = new mongoose.Schema(
  {
    address:{
        type:String,
        required:true,
        unique:true
    },
    token_Id:{
        type:Number,
        required:true
    },
    Name:{
        type:String,
        required:true,
    },
    Slug:{
        type:String,
        required:true
    },
    isListed:{
        type:Boolean,
        default:false
    },
    price:{
        type:Number,
        required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listed", ListedSchema);
