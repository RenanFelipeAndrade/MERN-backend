module.exports = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const tokenParts = token.split(".");

    if (!token || tokenParts.length === 0) throw "No access token provided";
    next();
  } catch (error) {
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
