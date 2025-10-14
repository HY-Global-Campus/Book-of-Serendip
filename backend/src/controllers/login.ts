import jsonwebtoken from "jsonwebtoken";
import express from "express"
import User from "../models/user.js"
import config from "../config.js";
import { UserTokenForm, isUserTokenForm } from "../types/user.js";

const loginRouter = express.Router();


loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;
  
  // TODO: Replace with MOOC OAuth integration
  // For now, accept any username/password for development
  if (!username || !password) {
    res.status(400).send('Username and password are required');
    return;
  }

  // Mock authentication - replace with OAuth later
  // Accept any credentials for development purposes
  const mockUserData = {
    user_id: `mooc_${username}_${Date.now()}`,
    display_name: username,
    email: `${username}@mooc.example.com`
  };
  
  let user = await User.findOne({
    where: {
      displayName: username
    }
  });
  
  if (!user) {
    user = await User.create({
      displayName: mockUserData.display_name,
      accelbyteUserId: mockUserData.user_id, // Keep field name for now, will be renamed later
      isAdmin: false
    });
  }
  
  const userForToken: UserTokenForm = {
    displayName: user.displayName,
    id: user.id.toString(),
    isAdmin: user.isAdmin || false,
  };
  
  const token = jsonwebtoken.sign(userForToken, config.JWT_SECRET);
  const responseJson = {
    token,
    displayName: user?.displayName,
    id: user?.id,
  };
  
  res.status(200).send(responseJson);
});


export default loginRouter;
