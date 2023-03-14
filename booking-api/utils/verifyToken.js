
import jwt from "jsonwebtoken";



export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    const error = new Error();
    error.status = 401;
    error.message = "You are not authenticated!";
    return next(error);
  }




  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err){
        return next(err);
    }
    req.user = user;
    next();
  });
};



export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
        const error = new Error();
        error.status = 403;
        error.message = "You are not authorized!";
      return next(error);
    }
  });
};



export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin === true) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};