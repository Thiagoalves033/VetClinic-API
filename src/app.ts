import express from 'express';
import 'express-async-errors';
import 'dotenv/config';

import connectDB from './db/connect';
import routes from './routes/clinic'; 
//Middleware imports go here

const app = express()

app.use(express.json())

// Routes go here
app.use('/tutors', routes)
app.use('/tutor', routes)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI!)
        app.listen(port, () => console.log(`Server listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
