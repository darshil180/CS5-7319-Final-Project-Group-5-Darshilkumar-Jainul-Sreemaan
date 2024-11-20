module.exports = (req, res, next) => {
    const originalJson = res.json;
  
    res.json = function (body) {
      const status = res.statusCode < 400 ? "Success" : "Error";
      const statusCode = res.statusCode;
  
      const formattedResponse = {
        msg: status,
        status: statusCode,
        data: body,
      };
  
      originalJson.call(this, formattedResponse);
    };
  
    next();
  };
  