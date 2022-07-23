import {Alert} from 'react-native';

export const customAlert = (
  title,
  text,
  btnTitle,
  btnPress,
  btnSubTitle,
  btnSubPress,
) => {
  Alert.alert(title, text, [
    {text: btnTitle, onPress: btnPress},
    {text: btnSubTitle, onPress: btnSubPress},
  ]);
};
