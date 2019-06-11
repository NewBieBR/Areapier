import API from './API'
import APIRoutes from '../../res/values/APIRoutes'
import { successfulResponse, unsuccessfulResponse } from '../../helpers/responseBuilders'

import Texts from '../../res/values/Texts'

export const createUser = async (username, passwordValue, authType, token, oauthId) => {
  try {
    await API.post(
      APIRoutes.createUser,
      {
        username: username,
        password: passwordValue,
        authType: authType,
        token: token,
        oauthId: oauthId
      })
    return successfulResponse(Texts.userCreationSuccess)
  } catch (error) {
    return unsuccessfulResponse(Texts.userAlreadyExists)
  }
}

export const connectUser = async (username, passwordValue, authType, token, oauthId) => {
  try {
    let response = await API.post(
      APIRoutes.connectUser,
      {
        username: username,
        password: passwordValue,
        authType: authType,
        token: token,
        oauthId: oauthId
      })
    return successfulResponse(Texts.nowConnected, response.data)
  } catch (error) {
    return unsuccessfulResponse(Texts.invalidCredentials)
  }
}
