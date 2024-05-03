import { Entry } from "../models/entry.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addNewEntry = asyncHandler(async(req,res)=>{
    try {
        const {title, content, tags} = req.body;
        const newEntry = new Entry({
            title ,
            content ,
            tags ,
            createdBy: req.user._id
        })
        const saved = await newEntry.save();
        return res.json( new ApiResponse(200,saved,"Entry created successfully"))
    } catch (error) {
        console.log("Error while creating new entry", error);
        throw error;
    }
})

export const updateEntry = asyncHandler(async(req,res)=>{
    try {
        const entryToUpdate  = await Entry.findById(req.body.entryId);
        const {title, content, tags} = req.body;
        const filteredFields = {
            title,
            content,
            tags
        }
        if(!entryToUpdate){
            throw new ApiError(404, "Entry not found");
        }
        Object.assign(entryToUpdate, filteredFields);
        console.log(entryToUpdate);
        const updatedEntry = await entryToUpdate.save();
        return res.json( new ApiResponse(200,updateEntry,"Entry updated successfully"))
    } catch (error) {
        console.log("Error while updating entry", error);
        throw error;
    }
})

export const deleteEntry = asyncHandler(async(req,res)=>{
    try {
        const deletedEntry  = await Entry.deleteOne({_id:req.body.entryId});
        if (deletedEntry.deletedCount === 0) {
            throw new Error('Entry not found');
        }
        return res.json( new ApiResponse(200,deleteEntry,"Entry deleted successfully"))
    } catch (error) {
        console.log("Error while deleting entry", error);
        throw error;
    }
})

export const fetchEntry = asyncHandler(async(req,res)=>{
    try {
        const userEntries = await Entry.find({createdBy: req.user._id});
        return res.json( new ApiResponse(200,userEntries,"Entry fetched successfully"))        
    } catch (error) {
        console.log("Error while fetching entry", error);
        throw error;
    }
})