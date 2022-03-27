const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: [{type:String}],
},{
  timestamps:true
});

userSchema.methods.checkPassword = function(password){
  return bcrypt.compareSync(password,this.password);
}

userSchema.pre('save',function(next) {
  // hash password before storing
  this.password = bcrypt.hashSync(this.password,8);
  // console.log(bcrypt.hashSync(this.password, 8));
  return next();
})

module.exports = mongoose.model('user',userSchema);