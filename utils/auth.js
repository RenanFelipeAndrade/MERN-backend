module.exports = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    if (!token) throw "No access token provided";
    next();
  } catch {
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
