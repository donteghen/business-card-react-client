
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Webtracker from './views/Webtracker';
import Welcome from './views/Welcome';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />}  />
        <Route path="/web-tracker" element={<Webtracker />} />
      </Routes>
    </Router>
  );
}

export default App;
