import type { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import Test from './pages/Test';

const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={Test} />
    </Router>
  );
};

export default App;
