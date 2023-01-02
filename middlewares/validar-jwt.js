const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {

  const token = req.header("x-api-key"); // Token mandado por parametro

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "error en el token",
    });
  }

  try {

    const { correo, id_user } = jwt.verify(token, process.env.SECRET_JWT_SEED); // Obtiene los datos que contiene el token de JWT

    req.correo = correo;
    req.id_user = id_user;

  } catch (error) {

    return res.status(401).json({
      ok: false,
      msg: "error en el token",
    });
    
  }
  next();
};

module.exports = {
  validateJWT,
};
