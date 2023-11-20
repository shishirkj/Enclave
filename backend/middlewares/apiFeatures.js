class apiFeatures{ 
    constructor(query,queryStr){ 
        this.query = query,
        this.queryStr = queryStr
    }

     search()
    { 
         
        // this(below)basically means 
        // if(key){ 
        //     let key = { 
        //         name:{ 
        //             $regex: this.queryStr,
        //             $options: "i",
        //         }
        //     }
        // }
        // else{ 
        //    key =  {}
        // }

            const key = this.queryStr.key ? { 
                name: { 
                    $regex:this.queryStr.key,
                    $options: "i",
                }
            } : {};
   console.log(key);
            this.query = this.query.find({...key});
            return this
    }

    filter(){ 
        const queryCopy = {...this.queryStr};
        const skipQuery = ["key","page","limit"];
        
        
        //for prices 
       
        let queryStr = JSON.stringify(queryCopy);
       
        
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(value)=>`$${value}`)
        queryStr = JSON.parse(queryStr);
     

        for(let i=0;i<skipQuery.length;i++)
        { 
            delete queryCopy[skipQuery[i]];
        }
      
        this.query = this.query.find(queryStr);
        return this;
    }

    pagination(resultPerPage){ 

        const currentPage = Number(this.queryStr.page)||1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    } 
        
    
}


export default apiFeatures