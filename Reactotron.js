// ReactotronConfig.js
import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  asyncStorage,
  networking
} from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

// then add it to the plugin list
Reactotron.configure({ name: 'React Native Demo' })
  .use(reactotronRedux()) //  <- here i am!
  .use(asyncStorage())
  .use(networking())
  .connect(); //Don't forget about me!
