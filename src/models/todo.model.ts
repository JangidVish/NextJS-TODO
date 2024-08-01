import mongoose, {Schema} from "mongoose";

export interface Todo {
    task: string;
    completed: boolean;
}

const todoSchema: Schema<Todo> = new Schema({
    task:{
        type: String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})

const todoModel = (mongoose.models.todos as mongoose.Model<Todo> || mongoose.model<Todo>("todos", todoSchema))

export default todoModel