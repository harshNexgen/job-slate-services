import { Postings } from "../Schema/postings"
 export function pagination(model, populate, findExp, select){
    return async (req,res,next)=>{

        const queryFindExpCpy = { ...req.query }
        console.log(queryFindExpCpy)
        delete queryFindExpCpy.page
        delete queryFindExpCpy.limit
        delete queryFindExpCpy.startDate
        delete queryFindExpCpy.endDate
        console.log({
            ...findExp,
            ...queryFindExpCpy,
          })
        query = Postings.find({
            ...findExp,
            ...queryFindExpCpy,
          })
        let page = 1
        let limit = 10

        if(typeof(req.query.page == "string") &&typeof(req.query.limit =="string")){
            page = parseInt(req.query.page)
            limit = parseInt(req.query.limit)
        }
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        query = query.skip(startIndex).limit(limit)

        const total = await Postings.countDocuments({
            ...findExp,
            ...queryFindExpCpy,
          }) // Count total nuber of bootcamps 
          if (populate) {
            query = query.populate(populate)
          }
          const results = await query
          res.paginationResult = {
            success:true,
            count:total,
            results
          }
          next()
    }
}

export const paginationMiddle = (event,context,next)=>{
    const message = "gii"
    return next(message,context)
}