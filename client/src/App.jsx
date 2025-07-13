import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import VantaBackground from './components/common/VantaBackground';
import { vantaPresets } from './hooks/useVantaBackground';

function App() {
  return (
    <VantaBackground config={vantaPresets.default}>
      <Toaster position="top-center" reverseOrder={false} />
      <Outlet />
    </VantaBackground>
  );
}

export default App;