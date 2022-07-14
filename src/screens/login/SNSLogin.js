import {
  getProfile as getKakaoProfile,
  login as KakaoLogin,
} from '@react-native-seoul/kakao-login';

export default {
  _KakaoLogin: async () => {
    try {
      await KakaoLogin();
      const profile = await getKakaoProfile();
      const userInfo = {
        social_id: profile.id,
        email: profile.email,
        nickname: profile.nickname,
      };
      console.log('kakao ###', profile);
      //   handleSNSLogin('3', userInfo);
    } catch (error) {
      console.error(error);
      console.log('카카오 로그인이 취소되었습니다.');
    }
  },
};
