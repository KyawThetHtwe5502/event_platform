import { CreateEventParams } from "@/types";
import { connectToDatabase } from "../database"
import Event from "../database/models/event.model";
import User from "../database/models/user.model";
import mongoose from "mongoose";

export const createEvent = async ({event, userId}:CreateEventParams) => {
    try{
        await connectToDatabase();
        const organizer  = await User.findById(userId);
        console.log(organizer,'Organizer found in DB');
        if(!organizer){
            throw new Error('Organizer not found');
        }
        const newEvent = await Event.create({
            ...event,
            category: new mongoose.Types.ObjectId(event.categoryId),
            organizer: new mongoose.Types.ObjectId(userId)
        });

        return JSON.parse(JSON.stringify(newEvent));

    } catch(error){
        console.log(error)
    }
}