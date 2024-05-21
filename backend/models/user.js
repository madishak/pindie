const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

userSchema.statics.findUserByCredentials = function(email, password) {
  console.log(email, password)
  return this.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject(new Error("Неправильные почта или пароль"));
    }
    console.log(password, user.password, bcrypt.compare(password, user.password), password === user.password)
    return bcrypt.compare(password, user.password).then(matched => {
      console.log(matched)
      // if (!matched) {
      //   return Promise.reject(new Error("Неправильные почта или пароль"));
      // }

      return user; // теперь user доступен
    });
  });
};

module.exports = mongoose.model("user", userSchema);
