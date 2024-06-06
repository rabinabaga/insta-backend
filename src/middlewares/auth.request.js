const ValidateRequest = (schema) => {
    return(req,res,next)=>{
        try {
            const validated = schema.parse(req.body);
            next();
          } catch (exception) {
            next(exception);
          }
    }
}

module.exports = ValidateRequest;