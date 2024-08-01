import dbConnect from "@/lib/dbConnect";
import todoModel from "@/models/todo.model";
import { ObjectId } from 'mongodb';

export async function DELETE(request:Request) {
    await dbConnect()

    try {
    const data  = await request.text()

        const deleteTask = await todoModel.deleteOne({_id: data})
        if(deleteTask){
            return Response.json({
                success:true,
                message:"Task Deleted Successfully"
            },{status:200})
        }

    } catch (error) {
        console.log(error)
        return Response.json({
            success:false,
            message:`Error while deleting message + ${error}`
        },{status:404})        
    }
}