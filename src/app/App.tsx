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
import Catch from './pages/native/commands/Catch';
import BrokenCommands from './pages/native/BrokenCommands';
import Notes from './pages/native/Notes';
import LibraryIntroduction from './pages/library/Introduction';
import LibraryConnection from './pages/library/Connection';
import LibraryMovement from './pages/library/Movement';
import LibraryButtons from './pages/library/Buttons';
import LibraryLocks from './pages/library/Locks';
import LibraryDeviceInfo from './pages/library/DeviceInfo';
import LibraryStream from './pages/library/Stream';
import LibraryFireAndForget from './pages/library/FireAndForget';
import LibraryAsync from './pages/library/features/Async';
import LibraryBatchBuilder from './pages/library/features/BatchBuilder';
import LibraryExtras from './pages/library/features/Extras';
import LibraryMock from './pages/library/features/Mock';
import LibraryProfile from './pages/library/features/Profile';
import LibraryTypesAndErrors from './pages/library/TypesAndErrors';

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
          <Route path="/native/commands/catch" component={Catch} />
          <Route path="/native/broken" component={BrokenCommands} />
          <Route path="/native/notes" component={Notes} />
          <Route path="/library" component={LibraryIntroduction} />
          <Route path="/library/connection" component={LibraryConnection} />
          <Route path="/library/movement" component={LibraryMovement} />
          <Route path="/library/buttons" component={LibraryButtons} />
          <Route path="/library/locks" component={LibraryLocks} />
          <Route path="/library/info" component={LibraryDeviceInfo} />
          <Route path="/library/stream" component={LibraryStream} />
          <Route path="/library/fire-and-forget" component={LibraryFireAndForget} />
          <Route path="/library/features/async" component={LibraryAsync} />
          <Route path="/library/features/batch" component={LibraryBatchBuilder} />
          <Route path="/library/features/extras" component={LibraryExtras} />
          <Route path="/library/features/mock" component={LibraryMock} />
          <Route path="/library/features/profile" component={LibraryProfile} />
          <Route path="/library/types" component={LibraryTypesAndErrors} />
        </Route>
        <Route path="*" component={() => <Navigate href="/" />} />
      </Router>
    </NotificationProvider>
  );
};

export default App;
