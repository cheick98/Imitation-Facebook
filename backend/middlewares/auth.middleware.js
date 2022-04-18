const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const userIdAuth = decodedToken.uid;
      req.auth = { userIdAuth };

      if (req.body.uid && req.body.uid !== userIdAuth) {
        throw "Désolé vous n'êtes la personne autorisée à effectuer l'action !";
      } else {
        next();
      }
    } else {
      throw "Votre token a expiré ou vous vous êtes deconnectés par inadvertance. Veuillez vous connecter à nouveau !";
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
