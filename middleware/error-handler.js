import { StatusCodes } from "http-status-codes";

// this file has to be implemented like it is stated in Express dosc
const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err.message); //or  console.log(err.stack);
  const defaultErorr = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later", // Checking if we passed some msg with throw, otherwise we setup default, and catch errors that from working with DB
  };
  if (err.name === "ValidationError") {
    defaultErorr.statusCode = StatusCodes.BAD_REQUEST;
    defaultErorr.msg = Object.values(err.errors).join(",");

    // defaultErorr.message = Object.values(err.errors).join(",");
  }
  if (err.code && err.code === 11000) {
    defaultErorr.statusCode = StatusCodes.BAD_REQUEST;
    defaultErorr.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }
  // res.status(defaultErorr.statusCode).json({msg:err.msg}); this type of error is better for developing
  res.status(defaultErorr.statusCode).json({ msg: defaultErorr.msg }); //while working with Mongoose and Postman you would like to still print whole err
};
export default errorHandlerMiddleware;
//place it last
