

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Mission from './pages/Mission';
import AudioControl from './components/AudioControl';

function App() {
  return (
    <Router>
      <div className="app-container">
        <BgStars />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/mission" element={<Mission />} />
        </Routes>
        <AudioControl />
      </div>
    </Router>
  );
}

// Simple Star Background Component
const BgStars = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      pointerEvents: 'none',
      background: 'radial-gradient(circle at bottom, #1B2735 0%, #090A0F 100%)'
    }}>
      {/* We will add real stars later */}
    </div>
  )
}

export default App;
