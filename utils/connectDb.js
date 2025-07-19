import mongoose from 'mongoose';

// connect tto db
export default async function connectDb() {
    if (mongoose.connections[0].readyState) return;
    mongoose.connect(process.env.MONGO_URI);
    console.log(`\n✅ db connected successfuly\n`);
}

// connect to db in api
export async function connectDbInApi(req) {
    try {
        await connectDb();
    } catch (error) {
        console.log(`\n❌${error.message} \n`);
        res.status(500).json({ status: 'failed', message: 'connection error' });
    }
}
