import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Profile from './profile';
import SignUp from './signup';

const screens = {
  Profile: {
    screen: Profile,
  },
  SignUp: {
    screen: SignUp,
  },
};

// home stack navigator screens
const ProfileStack = createStackNavigator(screens);

export default createAppContainer(ProfileStack);