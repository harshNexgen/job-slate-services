const { createResponse, extractCompany } = require("../helper");
const mongoose = require("mongoose");
const db = mongoose.connection;
import { Categories } from "../Schema/categories";
import { Companies } from "../Schema/companies";
import { Postings } from "../Schema/postings";
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0',
    {
        useNewUrlParser: true
    }
);
db.on("error", console.error.bind(console, "connection error  "));
db.once("open", () => {
    console.log("connected successfully ");
});

export const companiesInfo = async (event, context) => {
    try {
        const { id } = event.pathParameters;
        if (!id) {
            return createResponse(400, { response: "Id not found !" });
        }
        const data = await Companies.findById(id);
        if (!data) {
            return createResponse(400, { response: "Company data not found !" });
        } else {
            return createResponse(200, { response: data });
        }
    } catch (err) {
        console.log(err);
        return createResponse(400, { response: "Company not Found !" });
    }
};

export const getCompanies = async (event, context) => {
    try {
        if (event.queryStringParameters != null) {
            if (event.queryStringParameters.limit == null || event.queryStringParameters.offset == null) {
                return createResponse(400, { response: "Limit or Offset Not Found !" });
            }
            let { limit, offset } = event.queryStringParameters;
            limit = parseInt(limit);
            offset = parseInt(offset);
            const result = await Companies.find().limit(limit * 1).skip((offset - 1) * limit);
            return createResponse(200, { "total": result.length, result });
        } else {
            return createResponse(400, { response: "Query Params Not Found !" });
        }
    } catch (err) {
        console.log(err);
        return createResponse(400, { response: err })
    }
};

export const getJobByCompanyName = async (event, context) => {
    try {
        const { company } = event.pathParameters
        if (!company) {
            return createResponse(400, { response: "Company name not provided" });
        }
        const companyData = await Companies.find({ company: company });
        if (companyData[0] == null || companyData[0] == undefined) {
            return createResponse(400, { response: "Company Data Not Found" });
        }
        const companyId = companyData[0]._id;
        if (!companyId) {
            return createResponse(400, { response: "Company Id Not found in database" });
        }
        const fetchJobs = await Postings.find({ companyId: companyId });
        if (fetchJobs[0] == null || fetchJobs[0] == undefined) {
            return createResponse(400, { response: "Not Jobs Found" })
        }
        return createResponse(200, { response: fetchJobs });
    } catch (err) {
        console.log(err);
        return createResponse(400, { response: err })
    }
}

export const getJobByCategory = async (event, context) => {
    try {
        const { id } = event.pathParameters;
        if (!id) {
            return createResponse(400, { response: "Id not found" });
        }
        const fetchJobs = await Postings.find({ categoryId: id });
        console.log(fetchJobs.length, "here the length is")
        if (!fetchJobs) {
            return createResponse(400, { response: "Jobs not found" });
        }
        return createResponse(200, { response: fetchJobs });
    } catch (err) {
        return createResponse(400, { response: err })
    }
}

export const getAllCategory = async (event, context) => {
    try {
        const getCategories = await Categories.find();
        if (!getCategories || getCategories[0] == null || getCategories[0] == undefined) {
            return createResponse(400, { response: "Categories not found !" });
        }
        return createResponse(200, { response: getCategories });
    } catch (err) {
        console.log(err)
        return createResponse(400, { reponse: "Categories Not Found" });
    }
}

export const getCompaniesByCategory = async (event, context) => {
    try {
        const { category } = event.pathParameters;
        if (!category) {
            return createResponse(200, { response: "Category id not Found" });
        }
        const data = await Postings.aggregate([

            { $match: { categoryId: category } },
            { $group: { _id: "$companyId" } },


            {
                $lookup: {
                    from: "uk_companies",
                    localField: "_id",
                    foreignField: "_id",
                    as: "Company"
                }
            },

        ])
        if (data[0] != null || data[0] != undefined) {
            return createResponse(200, { response: data })
        }
    } catch (err) {
        console.log(err);
        return createResponse(400, { reponse: "Companie's Not Found" });
    }
}


export const getJobBySalaryExpec = async (event, context) => {
    try {
        if (event.queryStringParameters != null) {
            let {min,max} = event.queryStringParameters;
            if(min==undefined){
                min = 0
            }
            min = parseInt(min);
            max = parseInt(max);
            const data = await Postings.find({
                $and:[
                    {$or:[{"salary.maxAmount":{$lt:max}},{"salary.maxAmount":{$eq:max}}]}
                ]
            })
            if(data){
                return createResponse(200,{response:data});
            }
            if(data[0]==undefined){
                return createResponse(400,{response:"Data not found !"})
            }
        } else {
            return createResponse(400, { response: "Required query string not found" });
        }

        /* doubt on minimum and maximum salary , or we should decide the range of salary */
    } catch (err) {
        console.log(err);
    }
}


export const getJobByLocation =async (event,context)=>{
    console.log(event.body)
    if(event.body===null){
        return createResponse(400,{response:"Required details not found"});
    }
    const {city,country,location} = JSON.parse(event.body);
    console.log(city,country,location);
    const data = await Postings.find({
        $or:[
            {city:city},
             {location:location}
        ]
    })
    console.log(data[0]);
    if(data[0]!=undefined){
        return createResponse(200,{response:data});
    }else{
        return createResponse(400,{response:"Jobs Not Found"})
    }
    
}