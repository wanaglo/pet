import mongoose from 'mongoose';
import { app } from './app';

const PORT = process.env.PORT!;
const mongoURI = process.env.DB_URI!;

app.listen(PORT, async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log(`server application listen on ${PORT} port`);
    } catch (err) {
        console.log(err);
    }
});
