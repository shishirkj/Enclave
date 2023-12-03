class apiFeatures{ 
    constructor(query,queryStr){ 
        this.query = query,
        this.queryStr = queryStr
    }

    search() {
        const key = this.queryStr.key
          ? {
              name: {
                $regex: this.queryStr.key,
                $options: "i",
              },
            }
          : {};
    
        this.query = this.query.find({ ...key });
        return this;
      }

    filter() {
        const queryCopy = { ...this.queryStr };
        //   Removing some fields for category
        const removeFields = ["key", "page", "limit"];
    
        removeFields.forEach((key) => delete queryCopy[key]);
       
        // Filter For Price and Rating
    // to give postman price = price[gt]=1200 and check
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    
        this.query = this.query.find(JSON.parse(queryStr));
    
        return this;
      }

      pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
    
        const skip = resultPerPage * (currentPage - 1);
    
        this.query = this.query.limit(resultPerPage).skip(skip);
    
        return this;
      }
        
    
}


export default apiFeatures