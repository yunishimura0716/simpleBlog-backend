import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';
import BlogSchema from './blogs';

const SALT_WORK_FACTOR = 10;

export interface User extends Document {
  username: string;
  password: string;
  blogs: Array<string>;
}

const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: BlogSchema,
    },
  ],
});

UserSchema.pre('save', function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      this.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default model<User>('User', UserSchema);
