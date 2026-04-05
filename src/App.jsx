import Modals from '@/components/Organisms/Modals/Modals';
import { Toaster } from '@/components/ui/toaster';
import { AppContextProvider } from '@/Context/AppContextProvider';
import { AppRoutes } from '@/Routes/AppRoutes';

const App = () => {
  return (
    <AppContextProvider>
      <AppRoutes />
      <Modals />
      <Toaster />
    </AppContextProvider>
  );
};
export default App;
