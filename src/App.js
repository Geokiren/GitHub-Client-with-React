import { BrowserRouter as Router, Route  } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Following from './components/Following'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route path='/' exact component={Home} />
        <Route path='/following' component={Following} />
      </Router>
    </div>
  );
}

export default App;
