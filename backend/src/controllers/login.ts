import jsonwebtoken from "jsonwebtoken";
import express from "express"
import User from "../models/user.js"
import { loginWithUsernamePassword } from "../services/accelbyte.js";
import config from "../config.js";
import { UserTokenForm, isUserTokenForm } from "../types/user.js";

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  const loginRes = await loginWithUsernamePassword({username, password});

  let user = await User.findOne({
    where: {
      accelbyteUserId: loginRes.response?.data.user_id
    }
  })
  if (!user) {
    user = await User.create({
      displayName: loginRes.response?.data.display_name,
      accelbyteUserId: loginRes.response?.data.user_id
    });
  }
  const userForToken: UserTokenForm = {
    displayName: user.displayName,
    id: user.id
  };
  const token = jsonwebtoken.sign(userForToken, config.JWT_SECRET);
  const responseJson = {
    token,
    displayName: user?.displayName,
  }
  res.status(200).send(responseJson);

});

export default loginRouter;
