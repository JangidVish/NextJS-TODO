import todoModel from "@/models/todo.model";
import mongoose from "mongoose";

type ConnectionObject= {
    isConnected?: number
}

const connection :ConnectionObject ={}

async function dbConnect() {
    if(connection.isConnected){
        console.log("Db is already connected");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "")
        console.log(db.connections);
        const isConnected = db.connections[0].readyState === 1;

        console.log("=> using new database connection");


        //If COnnected then make dummy entry
        // await todoModel.create({ task: 'Example Task', completed: false });
        // console.log("Todo collection is created and example document added");
        
    } catch (error) {
        console.log("Database Connection is failed ",error)

        process.exit(1)
    }
    
}

export default dbConnect;
