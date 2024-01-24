import Listing from "../models/listing.model.js"

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