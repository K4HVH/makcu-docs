import type { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import { NotificationProvider } from '../components/feedback/Notification';
import Home from './pages/Home';

const App: Component = () => {
  return (
    <NotificationProvider>
      <Router>
        <Route path="/" component={Home} />
      </Router>
    </NotificationProvider>
  );
};

export default App;
