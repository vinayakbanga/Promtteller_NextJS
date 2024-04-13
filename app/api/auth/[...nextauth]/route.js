import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import User from "@models/user";
// console.log(process.env.GOOGLE_ID,process.env.GOOGLE_CLIENT_SECRET);
import { connectToDB } from "@utils/database";


const handler=NextAuth({
    providers:[
        GoogleProvider({
           clientId:process.env.GOOGLE_ID,
           clientSecret:process.env.GOOGLE_CLIENT_SECRET ,
        })
    ], 
    callbacks:{
        
        async session({session}){
            const sessionUser=await User.findOne({
                email:session.user.email
            })
            session.user.id=sessionUser._id.toString();
    
            return session;
    
        },
        async signIn({profile}){
            try {
                //every next js route is known a s serverless route
                await connectToDB();
    
                //check if a user already exits
                const userExists=await User.findOne({
                    email:profile.email
                    //1:35
                })
    
                //if not create new
                if(!userExists){
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(" ","").toLowerCase(),
                        image:profile.picture
                        
                    })
                }
                return true;
            } catch (error) {
                console.log(error);
    
                return false;
                
            }
    
        }
    }
})



export {handler as GET,handler as POST};