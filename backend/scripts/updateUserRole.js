import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const updateUserRole = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const result = await User.updateOne(
      { email: 'jabirjamal922@gmail.com' },
      { $set: { role: 'admin' } }
    );

    if (result.matchedCount === 0) {
      console.log('❌ User not found');
      process.exit(1);
    }

    console.log('✅ User role updated to admin');

    const user = await User.findOne({ email: 'jabirjamal922@gmail.com' }).select('-password');
    console.log('\n👤 Updated User:');
    console.log(JSON.stringify(user, null, 2));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

updateUserRole();
