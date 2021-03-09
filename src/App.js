import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Following from './components/Following'
import { Suspense } from 'react'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
          <Suspense fallback={<div>LOADING...</div>}>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/following' component={Following} />
            </Switch>
          </Suspense>
      </Router>
    </div>
  );
}

export default App;
