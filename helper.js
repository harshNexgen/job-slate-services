
export const createResponse = (statusCode, message) => {
    return {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
        },
        body: JSON.stringify(message)
    };
};



export const unique = (arr)=>{
    const uniqueIds =[];
    arr.filter(item=>{
        const isDuplicate = uniqueIds.includes(item.companyId);
        if(!isDuplicate){
            uniqueIds.push(item)
            return true;
        }return false;
    })
}

/* export const extractCompany =async (id)=>{
    const data = await Companies.findById(id)
    console.log(data,"in the extract function data")
    return data
} */

