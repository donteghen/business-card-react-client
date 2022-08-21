
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CreateDelivery from './views/Createdelivery';
import CreatePackage from './views/Createpackage';
import WebAdmin from './views/Webadmin';
import Webdriver from './views/Webdriver';
import Webtracker from './views/Webtracker';
import Welcome from './views/Welcome';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Welcome />}  />
        <Route path='web-tracker' element={<Webtracker />} />
        <Route path='web-driver' element={<Webdriver/>} />
        <Route path="web-admin">
          <Route path='' element={<WebAdmin/>} />
          <Route path='create-package' element={<CreatePackage/>} />
          <Route path='create-delivery' element={<CreateDelivery/>} />
        </Route>
          
      </Routes>
    </Router>
  );
}

export default App;
