import Footer from '../Footer';
import Navbar from '../Navbar';

const App = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Navbar />

      {/* Contenu principal extensible */}
      <div style={{ flex: 1 }}>
        {/* Ton contenu ou <Outlet /> si tu utilises react-router */}
      </div>

      <Footer />
    </div>
  );
};

export default App;
