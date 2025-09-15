'use server'

import { CreateUserParams } from "@/types"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model";

export const createUser = async (user: CreateUserParams) => {
    try{
        await connectToDatabase();
        console.log(user,'Creating new user in DB');
        const newUser = await User.create(user);
        console.log(newUser,'New User created in DB');
        return JSON.parse(JSON.stringify(newUser));
    } catch(error){
        console.log(error,'Error creating user');
    }
}