import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js"

export const createListing= async(req, res, next)=>{
    try {
        console.log(req.body)
        const listing= await Listing.create(req.body)
        return res.status(201).send({
            success:true,
            listing
        })
    } catch (error) {
        next(error)
    }
}
export const deleteListing= async(req, res, next)=>{
    const listing = await Listing.findById(req.params.id)
    if(!listing){
        return next(errorHandler(404,"Listing not found"))
    }
    if(req.user.id!==listing.userRef){
        return next(errorHandler(401, "You can only delete your own listings!"))
    }
    try {
        await Listing.findByIdAndDelete(req.params.id)
        return res.status(200).send({success:true, message:"Delete successfuly"})
    } catch (error) {
        next(error)
    }
}

export const updateListing= async(req, res, next)=>{
    
    const listing = await Listing.findById(req.params.id)
    if(!listing){
        return next(errorHandler(404,"Listing not found"))
    }
    if(req.user.id!==listing.userRef){
        return next(errorHandler(401, "You can only update your own listings!"))
    }
    try {
        const updatedListing= await Listing.findByIdAndUpdate(req.params.id,req.body, {new:true})
        return res.status(200).send({
            success:true,
            updatedListing
        })
    } catch (error) {
        next(error)
    }
}

export const getListing= async(req, res, next)=>{
    try {
        const listing= await Listing.findById(req.params.id)
        if(!listing){
            return next(errorHandler(404,"Listing not found!"))
        }
        return res.status(200).send({success:true,
        listing})
    } catch (error) {
        next(error)
    }
}
export const getListings= async(req, res, next)=>{
    try {
        const limit= parseInt(req.query.limit) || 9
        const startIndex= parseInt(req.query.startIndex) || 0
        let offer= req.query.offer
        if(!offer){
             offer= {$in:[false, true]}
        }
        let furnished= req.query.furnished
        if(!furnished){
            furnished= {$in:[false, true]}
        }
        let parking= req.query.parking
        if(!parking){
            parking= {$in:[false, true]}
        }
        let type= req.query.type
        if(type===undefined || type==="all"){
            type= {$in:['sale', 'rent']}
        }
        const searchTerm= req.query.searchTerm || ""
        const sort = req.query.sort || "createdAt"
        const order= req.query.order || "desc"
        const listings= await Listing.find({
            name:{ $regex:searchTerm, $options:'i'},
            offer,
            furnished,
            parking,
            type
        }).sort({[sort]:order}).limit(limit).skip(startIndex)
        return res.status(200).send({success:true, listings})
    } catch (error) {
        next(error)
    }
}