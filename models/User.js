const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema (
    {
        username: {
          type: String,
          required: true,
          unique: true,
          maxlength: 45,
          trim: true
        },
        password:{
            type: String,
            required: true
        },
        email:{ 
          type: String,
          required: true,
          unique: true,
          trim: true,
          match:[/.+\@.+\..+/, 'invalid email']
        },
        name: {
            type: String,
            required: true,
            unique: false,
            maxlength: 65,
            trim: true
          },
        homes: [
          {
            type: Schema.Types.ObjectId,
            ref: 'home',
          },
        ]
      },
      {
        // virtuals included for friendCount
        toJSON: {
          virtuals: true,
        }
      }
    );

userSchema
.virtual('homesCount')
// Getter
.get(function () {
return this.homes.length;
})

userSchema
.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema
.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//Services password test code below:
// source: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
// // create a user a new user
// var testUser = new User({
//     username: jmar777,
//     password: Password;
// });

// // save user to database
// testUser.save(function(err) {
//     if (err) throw err;

// // fetch user and test password verification
// User.findOne({ username: 'jmar777' }, function(err, user) {
//     if (err) throw err;

//     // test a matching password
//     user.comparePassword('Password123', function(err, isMatch) {
//         if (err) throw err;
//         console.log('Password123:', isMatch); // -> Password123: true
//     });

//     // test a failing password
//     user.comparePassword('123Password', function(err, isMatch) {
//         if (err) throw err;
//         console.log('123Password:', isMatch); // -> 123Password: false
//     });
// });




  // Initialize our User model
const User = model('user', userSchema);

module.exports = User
