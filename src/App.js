import { BrowserRouter as Router, Route  } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Followers from './components/Followers'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route path='/' exact component={Home} />
        <Route path='/followers' component={Followers} />
      </Router>
    </div>
  );
}

export default App;
