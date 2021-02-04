import User from "../../../model/User";
import nodemailer from "nodemailer";
import smtpPool from "nodemailer-smtp-pool";
import crypto from "crypto";

export default {
 Query: {
  getAllUser: async (_, args) => {
   try {
    const result = await User.find();

    return result;
   } catch (e) {
    console.log(e);
    return [];
   }
  },
  getDetailUser: async (_, args) => {
   const { id } = args;
   try {
    const result = await User.findOne({ _id: id });
    return result;
   } catch (e) {
    console.log(e);
    return {};
   }
  },
  getUserTotalPage: async (_, args) => {
   const { searchValue, limit } = args;

   try {
    const result = await User.find({
     title: { $regex: `.*${searchValue}.*` },
    }).sort({
     createdAt: -1,
    });

    const cnt = result.length;

    const realTatalPage = cnt % limit > 0 ? cnt / limit + 1 : cnt / limit;

    return parseInt(realTatalPage);
   } catch (e) {
    console.log(e);
    return 0;
   }
  },
  getAllUserlength: async (_, args) => {
   try {
    const result = await User.find();

    const cnt = result.length;

    return parseInt(cnt);
   } catch (e) {
    console.log(e);
    return [];
   }
  },
  getAllFollowerlength: async (_, args) => {
   const { id } = args;
   try {
    const result = await User.findOne({ _id: id });

    console.log(result);
    const follwerlen = result.follower.length;

    return parseInt(follwerlen);
   } catch (e) {
    console.log(e);
    return [];
   }
  },
 },
 Mutation: {
  updatePassWord: async (_, args) => {
   const { email, passWord } = args;
   try {
    console.log(passWord);
    let cilper = crypto.createHash("sha512");

    cilper.update(passWord);
    const encPassword = cilper.digest("hex");
    const result = await User.updateOne(
     { email },
     { $set: { passWord: encPassword } }
    );

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  codeCheck: async (_, args) => {
   const { email, code } = args;
   try {
    const result = await User.findOne({ email, checkCode: code });
    console.log(result);
    if (result.checkCode === code) {
     await User.updateOne(
      { email },
      {
       $set: { checkCode: `-` },
      }
     );
     return true;
    } else {
     return false;
    }
   } catch (e) {
    console.log(e);
    return false;
   }
  },

  getUser: async (_, args) => {
   const { email, passWord } = args;
   try {
    let cilper = crypto.createHash("sha512");

    cilper.update(passWord);
    const encPassword = cilper.digest("hex");
    const result = await User.findOne({ email, passWord: encPassword });

    return {
     isLogin: true,
     userData: result,
    };
   } catch (e) {
    console.log(e);
    return {
     isLogin: false,
     userData: {},
    };
   }
  },

  checkUserNickName: async (_, args) => {
   const { nickName } = args;
   try {
    const result = await User.find({ nickName });

    console.log("dsfssdfdsfssd", result.length);

    if (result.length < 1) {
     return true;
    } else {
     return false;
    }
   } catch (e) {
    console.log(e);
    return false;
   }
  },

  checkCodeUser: async (_, args) => {
   const { email } = args;

   try {
    const randomCode = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`];
    const code =
     randomCode[Math.floor(Math.random() * 10)] +
     randomCode[Math.floor(Math.random() * 10)] +
     randomCode[Math.floor(Math.random() * 10)] +
     randomCode[Math.floor(Math.random() * 10)] +
     randomCode[Math.floor(Math.random() * 10)];

    const smtpTransport = nodemailer.createTransport(
     smtpPool({
      service: "Gmail",
      host: "localhost",
      port: "465",
      tls: {
       rejectUnauthorize: false,
      },

      auth: {
       user: "4leaf.hmg@gmail.com",
       pass: "zmaeyzaijjqbwajm",
      },
      maxConnections: 5,
      maxMessages: 10,
     })
    );

    const mailOpt = {
     from: "4leaf.hmg@gmail.com",
     to: email,
     subject: "🔐인증코드 전송 [www.community.com]",
     html: `인증코드는 ${code} 입니다.`,
    };

    await smtpTransport.sendMail(mailOpt, function (err, info) {
     if (err) {
      console.error("Send Mail error : ", err);
      smtpTransport.close();
     } else {
      console.log("Message sent : ", info);
      smtpTransport.close();
     }
    });
    const result = await User.updateOne(
     { email },
     { $set: { checkCode: code } }
    );

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  createUser: async (_, args) => {
   const {
    name,
    profileImage,
    email,
    mobile,
    address,
    detailAddress,
    zoneCode,
    passWord,
    birth,
    nickName,
   } = args;
   try {
    let cilper = crypto.createHash("sha512");

    console.log(cilper);

    cilper.update(passWord);
    const encPassword = cilper.digest("hex");
    const result = await User.create({
     type: "User",
     name,
     profileImage,
     email,
     mobile,
     address,
     detailAddress,
     zoneCode,
     passWord: encPassword,
     checkCode: "-",
     birth,
     nickName,
    });

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  updateUser: async (_, args) => {
   const {
    id,
    name,
    email,
    mobile,
    address,
    detailAddress,
    zoneCode,
    birth,
    nickName,
   } = args;
   try {
    const result = await User.updateOne(
     { _id: id },
     {
      $set: {
       name,
       email,
       mobile,
       address,
       detailAddress,
       zoneCode,
       birth,
       nickName,
      },
     }
    );

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  updateProfileImg: async (_, args) => {
   const { id, profileImage } = args;
   try {
    const result = await User.updateOne(
     { _id: id },
     { $set: { profileImage } }
    );

    console.log(result);
    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  deleteUser: async (_, args) => {
   const { id } = args;
   try {
    const result = await User.deleteOne({ _id: id });

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  updateFollower: async (_, args) => {
   const { id, userId } = args;
   try {
    const userData = await User.findOne({ _id: id });

    if (userData.follower !== userId) {
     const result = await User.updateOne(
      { _id: id },
      { $push: { follower: userId } }
     );
     return true;
    } else {
     return false;
    }
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  deleteFollower: async (_, args) => {
   const { id, userId } = args;

   try {
    const userData = await User.findOne({ _id: id });
    console.log(userData.follower);
    console.log(id);
    console.log(userId);
    const userFollower = userData.follower.filter(
     (follower) => follower !== userId
    );

    if (userData.follower !== userId) {
     const result = await User.updateOne(
      { _id: id },
      { $set: { follower: userFollower } }
     );
     return true;
    } else {
     return false;
    }
   } catch (e) {
    console.log(e);
    return false;
   }
  },
 },
};
