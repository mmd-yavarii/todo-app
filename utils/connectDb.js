import mongoose from 'mongoose';

export default async function connectDb() {
  if (mongoose.connections[0].readyState) return;

  mongoose.connect(process.env.URI);
  console.log(`\n✅ database connected successfully\n`);
}
