import Footer from '../Footer';
import Navbar from '../Navbar';
import { Box } from '@mui/system';
import HomePage from '../pages/Homepage';

const App = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Navbar />

      <Box style={{ flex: 1 }}>
        <HomePage />
      </Box>

      <Footer />
    </div>
  );
};

export default App;
