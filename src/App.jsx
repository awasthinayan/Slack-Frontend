import Modals from '@/components/Organisms/Modals/Modals';
import { AppContextProvider } from '@/Context/AppContextProvider';
import { AppRoutes } from '@/Routes/AppRoutes';

const App = () => {
  return (
    <AppContextProvider>
      <AppRoutes />
      <Modals />
    </AppContextProvider>
  );
};
export default App;
