import dbConnect from "@/lib/dbConnect";
import todoModel from "@/models/todo.model";


export async function POST(request:Request) {
    await dbConnect();

    const {task} = await request.json()
    try {
        // const newTask = {task, completed}
        const createdTask = await todoModel.create({ task: task, completed: false});
        if(createdTask){
            return Response.json({
                success: true,
                message: "Task Created Successfully"
            },{status:200})
        }

        return Response.json({
            success: false,
            message: "Failed While Creating a Task"
        },{status:404})

    } catch (error) {
        return Response.json({
            success: false,
            message: "Error in post method"
        },{status:404})
    }
}