import dbConnect from "@/lib/dbConnect";
import todoModel from "@/models/todo.model";




export async function GET(res:Response) {
    await dbConnect();

    try {
        const data = await todoModel.find({});
        // console.log(data);
        return Response.json({
            success:true,
            message:data
        },{status:200})
        
    } catch (error) {
        console.log("Error While Fetching Data ",error);
        return Response.json({
            success:false,
            message:"Error While Fetching data"
        },{status:500})
        
    }
}