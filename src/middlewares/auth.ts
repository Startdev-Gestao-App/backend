import jwt from "jsonwebtoken";

export const verifyToken = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Token é obrigatório" });
  }

  try {
    const replace = token.replace("Bearer ", "");
    const decoded = jwt.verify(replace, String(process.env.TOKEN_KEY));
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }
};
