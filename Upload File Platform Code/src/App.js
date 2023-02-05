import React, { Component } from 'react';

// Router
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { ContextProvider } from './utils/contextModule';
import Lighthouse from './lighthouse/lighthouse';

class App extends Component {
  render() {
    return (
      <div>
        <ContextProvider>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Lighthouse />
                  </>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <Lighthouse />
                  </>
                }
              />
            </Routes>
          </Router>
        </ContextProvider>
      </div>
    );
  }
}

export default App;