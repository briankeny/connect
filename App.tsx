import Router from './src/routes/Router';
import { Provider} from 'react-redux';
import { store } from './src/store/store';

export default function App() {
  return (
  <Provider store={store}>
        <Router />
  </Provider>
  )
}