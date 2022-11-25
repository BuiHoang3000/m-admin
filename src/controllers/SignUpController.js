import {
  addUser,
  checkNotExistEmail,
  checkExistNickname,
} from '../config/db/json-db.js';

// [POST] /api/signup
export const signup = async (req, res) => {
  try {
    await addUser(req.body);
    return res.json({
      success: true,
      message: 'Sign up account success!',
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// [POST] /api/signup/check-duplicate-email
export const checkDuplicateEmail = async (req, res) => {
  const { email } = req.body;
  let checkNotExist = false;
  try {
    await checkNotExistEmail(email).then((response) => {
      checkNotExist = response;
    });
    if (checkNotExist) {
      return res.json({
        success: true,
        code: 'UNREGISTERED_EMAIL',
        message: 'Unregistered email',
      });
    } else {
      return res.json({
        success: true,
        code: 'EXISTED_EMAIL',
        message: 'Existed email!',
      });
    }
  } catch {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// [POST] /api/signup/check-duplicate-nickname
export const checkDuplicateNickname = async (req, res) => {
  const { nickname } = req.body;
  let checkNotExist = false;
  try {
    await checkExistNickname(nickname).then((response) => {
      checkNotExist = response;
    });
    if (checkNotExist) {
      return res.json({
        success: true,
        code: 'UNREGISTERED_NICKNAME',
        message: 'Unregistered nickname',
      });
    } else {
      return res.json({
        success: true,
        code: 'EXISTED_NICKNAME',
        message: 'Existed nickname!',
      });
    }
  } catch {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
