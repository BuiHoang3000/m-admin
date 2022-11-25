import fetch from 'node-fetch';
import { checkNotExistEmail } from '../config/db/json-db.js';

// Get token
const getToken = (code) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', 'd48236510b105bf316c72d4c6f415363');
  params.append('redirect_uri', 'http://localhost:3000/oauth/kakao');
  params.append('code', code);

  return fetch('https://kauth.kakao.com/oauth/token', {
    method: 'post',
    body: params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch(function (err) {
      console.log('Unable to fetch -', err);
    });
};

// Get user info
const getUserInfo = async (code) => {
  const token = await getToken(code);
  return fetch('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return {
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        id_token: token.id_token,
        expires_in: token.expires_in,
        refresh_token_expires_in: token.refresh_token_expires_in,
        nickname: data.kakao_account.profile.nickname,
        thumbnail_image_url: data.kakao_account.profile.thumbnail_image_url,
        profile_image_url: data.kakao_account.profile.profile_image_url,
        email: data.kakao_account.email,
      };
    })
    .catch(function (err) {
      console.log('Unable to fetch -', err);
    });
};

// [GET] /api/login
export const login = async (req, res) => {
  let checkNotExist = false;
  try {
    const info = await getUserInfo(req.query.code);
    await checkNotExistEmail(info.email).then((response) => {
      checkNotExist = response;
    });
    if (checkNotExist) {
      return res.json({
        success: true,
        code: 'UNREGISTERED_ACCOUNT',
        message: 'Unregistered account',
        data: info,
      });
    } else {
      return res.json({
        success: true,
        code: 'SUCCESS',
        message: 'Login success!',
        data: info,
      });
    }
  } catch {
    return res.status(400).json({
      success: false,
      code: 'LOGIN_KAKAO_ERROR',
      message: 'Login kakao error!',
    });
  }
};
