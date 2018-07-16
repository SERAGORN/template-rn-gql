import {TabNavigator,} from 'react-navigation';
import HomeScreen from './Home';
import ProfileScreen from './Profile';
  
  const Router = TabNavigator({
    Home: { screen: HomeScreen },
    Profile : { screen: ProfileScreen },
  });
  
  export default Router;