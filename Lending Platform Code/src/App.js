import React, { Component } from 'react';

// Router
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Sidebar from './components/sidebar';
import Mainbar from './components/mainscreen';
import { ContextProvider } from './utils/contextModule';

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
                    <Sidebar />
                    <Mainbar />
                  </>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <Sidebar />
                    <Mainbar />
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