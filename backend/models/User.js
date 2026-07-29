import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
        minLength:8
    }
  },
  {
    timestamps: true,
  },
);


userSchema.pre('save',async function (){
    if(!this.isModified('password')) return 

    this.password= await bcrypt.hash(this.password,10)


})

userSchema.methods.matchPassword=async function (userPassword){
return await bcrypt.compare(userPassword,this.password)
}

export default mongoose.model('User',userSchema);