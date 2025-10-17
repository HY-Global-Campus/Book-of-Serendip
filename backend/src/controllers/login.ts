import jsonwebtoken from "jsonwebtoken";
import express from "express"
import User from "../models/user.js"
import { loginWithAuthCode, loginWithUsernamePassword } from "../services/accelbyte.js";
import config from "../config.js";
import { UserTokenForm, isUserTokenForm } from "../types/user.js";

const loginRouter = express.Router();


loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const loginRes = await loginWithUsernamePassword({username, password}).catch( (e) => {
    console.log(e);
  });

  if (!loginRes) {
    res.status(401).send();
    return;
  }

  let user = await User.findOne({
    where: {
      accelbyteUserId: loginRes.response?.data.user_id!
    }
  })
  if (!user) {
    user = await User.create({
      displayName: loginRes.response?.data.display_name!,
      accelbyteUserId: loginRes.response?.data.user_id!
    });
  }
  const userForToken: UserTokenForm = {
    displayName: user.displayName,
    id: user.id,
    isAdmin: user.isAdmin,
  };
  const token = jsonwebtoken.sign(userForToken, config.JWT_SECRET);
  const responseJson = {
    token,
    displayName: user?.displayName,
    id: user?.id,
  }
  res.status(200).send(responseJson);

});

loginRouter.post('/authcode', async (req, res) => {
  const { code } = req.body;
  console.log(code)
  const loginRes = await loginWithAuthCode(code).catch(e => {
    console.log(e);
  })
  console.log("auth ", loginRes)
  if (!loginRes) {
    res.status(401).send();
    return;
  }

  let user = await User.findOne({
    where: {
      accelbyteUserId: loginRes.data.user_id!
    }
  })

  if (!user) {
    user = await User.create({
      displayName: loginRes.data.display_name!,
      accelbyteUserId: loginRes.data.user_id!
    });
  }
  const userForToken: UserTokenForm = {
    displayName: user.displayName,
    id: user.id,
    isAdmin: user.isAdmin,
  };
  const token = jsonwebtoken.sign(userForToken, config.JWT_SECRET);
  const responseJson = {
    token,
    displayName: user?.displayName,
    id: user?.id,
  }
  res.status(200).send(responseJson);
})

export default loginRouter;
