import type { Component } from 'solid-js';
import { Router, Route, Navigate } from '@solidjs/router';
import { NotificationProvider } from '../components/feedback/Notification';
import Home from './pages/Home';
import DocsLayout from './pages/DocsLayout';
import Introduction from './pages/native/Introduction';
import Hardware from './pages/native/Hardware';
import Transport from './pages/native/Transport';
import Connection from './pages/native/Connection';
import Protocol from './pages/native/Protocol';
import Version from './pages/native/commands/Version';
import Buttons from './pages/native/commands/Buttons';
import Movement from './pages/native/commands/Movement';
import Wheel from './pages/native/commands/Wheel';
import Locks from './pages/native/commands/Locks';
import Stream from './pages/native/commands/Stream';
import Serial from './pages/native/commands/Serial';
import BrokenCommands from './pages/native/BrokenCommands';
import Notes from './pages/native/Notes';
import LibraryPlaceholder from './pages/library/LibraryPlaceholder';

const App: Component = () => {
  return (
    <NotificationProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/" component={DocsLayout}>
          <Route path="/native" component={Introduction} />
          <Route path="/native/hardware" component={Hardware} />
          <Route path="/native/transport" component={Transport} />
          <Route path="/native/connection" component={Connection} />
          <Route path="/native/protocol" component={Protocol} />
          <Route path="/native/commands/version" component={Version} />
          <Route path="/native/commands/buttons" component={Buttons} />
          <Route path="/native/commands/movement" component={Movement} />
          <Route path="/native/commands/wheel" component={Wheel} />
          <Route path="/native/commands/locks" component={Locks} />
          <Route path="/native/commands/stream" component={Stream} />
          <Route path="/native/commands/serial" component={Serial} />
          <Route path="/native/broken" component={BrokenCommands} />
          <Route path="/native/notes" component={Notes} />
          <Route path="/library" component={LibraryPlaceholder} />
        </Route>
        <Route path="*" component={() => <Navigate href="/" />} />
      </Router>
    </NotificationProvider>
  );
};

export default App;
