const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const MONGO_URI =
  'mongodb+srv://gary1190:t3cVudmFa51QuKlc@cluster0.grjtc.mongodb.net/<dbname>?retryWrites=true&w=majority';
  
mongoose
.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'SocialReaction'
})
.then(() => console.log('Connected to Mongo DB.'))
.catch((err) => console.log(err));

 
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  topics: Array,
});
 
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
  

  return next();
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('user', userSchema);
module.exports = User;