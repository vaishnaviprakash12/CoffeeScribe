const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema=mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
    console.log("pre-save middleware is running");
    try {
      // Check if the password field is modified; if not, move to the next middleware
      if (!this.isModified("password")) {
        return next();
      }
      
      // Generate a salt and hash the password with it
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
  
      return next();
    } catch (error) {
    console.log("error in middleWare")
      return next(error); // Handle any errors that occur during password hashing
    }
  });
  

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
