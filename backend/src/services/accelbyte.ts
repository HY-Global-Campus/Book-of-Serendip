import { AccelByte, Network, AccelByteSDK } from "@accelbyte/sdk"
import { IamUserAuthorizationClient } from "@accelbyte/sdk-iam";
import { OAuth20Api } from "@accelbyte/sdk-iam";
import { Cloudsave } from "@accelbyte/sdk-cloudsave";
import config from "../config.js";

const accelbyte = AccelByte.SDK({
  coreConfig: {
    baseURL: "https://universityofhelsinki.prod.gamingservices.accelbyte.io",
    clientId: "35568f9b3f1a44f7a37089948bffefd2",
    namespace: "Serendip",
    redirectURI: "http://127.0.0.1",
    
  },
});

const accelbyteAdmin = AccelByte.SDK({
  coreConfig: {
    baseURL: "https:/serendip.prod.gamingservices.accelbyte.io",
    clientId: config.ACCELBYTE_ADMIN_CLIENT_ID,
    namespace: "Serendip",
    redirectURI: "http://127.0.0.1",
  },
});

const iamClient = new IamUserAuthorizationClient(accelbyte);


//const network = Network.create(accelbyte.assembly());


export const loginWithUsernamePassword = async (credentials: {username: string, password: string}) => {
  return await iamClient.loginWithPasswordAuthorization(credentials);      
}

const adminLogin = async () => {
  try {
    console.info(accelbyteAdmin.assembly())
    
    const tokenResponse = await OAuth20Api(accelbyteAdmin, {
      axiosConfig: {
        request: {
          headers: {
            // If you're using Public IAM Client you can leave CLIENT_SECRET as empty string
            // But if you're using Confidential IAM Client you need to provide the CLIENT_SECRET
            Authorization: `Basic ${Buffer.from(`${config.ACCELBYTE_ADMIN_CLIENT_ID}:${config.ACCELBYTE_ADMIN_SECRET}`).toString('base64')}`
          }
        }
      }
    }).postOauthToken_v3({ grant_type: 'client_credentials' })

    if (!tokenResponse.data.access_token) {
      throw new Error('Login failed')
    }
    const { access_token, refresh_token } = tokenResponse.data

    accelbyteAdmin.setToken({ accessToken: access_token, refreshToken: refresh_token })

  } catch (error) {
    console.error(error)
  }
}



export const loginWithAuthCode = async (code: string) => {
  return null
}


export const getCloudSave = async (key: string) => {
  await adminLogin();
  let res =  await Cloudsave.GameRecordAdminApi(accelbyteAdmin).getRecord_ByKey(key);
  console.log(res.data);
  return res.data;
}

export const updateCloudSave = async (key: string, value: any) => {
  await adminLogin();
  let res =  await Cloudsave.GameRecordAdminApi(accelbyteAdmin).updateRecord_ByKey(key, value);
  console.log(res.data);
  return res.data;
}




export default accelbyte
