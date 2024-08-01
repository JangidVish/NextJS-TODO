import dbConnect from "@/lib/dbConnect";
import todoModel from "@/models/todo.model";
import { error } from "console";


export async function GET(req: Request, res:Response) {
    const connection = await dbConnect();
    console.log("Db Connected Successfully");
    // const collection =  .collection("to")
    // const dataBase = todoModel;
        try {
            const data = await todoModel.find({})
            // console.log(data)
            return new Response(JSON.stringify({
                success: true,
                message: data
              }), { status: 200 });
        } catch (error) {
            return new Response(JSON.stringify({
                success: false,
                message: error
            }),{status: 500})
        }
    
}