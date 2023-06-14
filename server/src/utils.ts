import jwt from "jsonwebtoken";
const APP_SECRET = "GraphQL-is-aw3some";

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}

function getUserId(req: any, authToken = undefined) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { userId }: any = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId }: any = getTokenPayload(authToken);
    return userId;
  }

  throw new Error("Not authenticated");
}

export { APP_SECRET, getUserId };
