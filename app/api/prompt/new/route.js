
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST =async(req,res)=>{
    console.log("Creating promt");

    const {userId,prompt,tag} = await req.json();

    try {
     await connectToDB();   
     const newPrompt = new Prompt({
        creator:userId,
        prompt:prompt,
        tag
     })
     await newPrompt.save();
    //  console.log(newPrompt);
     return new Response(JSON.stringify(newPrompt),{
        status:201
     })
    } catch (error) {

        return new Response("Failed to built new propmt")
    }
     
    // 2.05

}