import type { Component } from 'solid-js';
import { A } from '@solidjs/router';

const NotFound: Component = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <nav>
        <ul>
          <li>
            <A href="/">Go to Home</A>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NotFound;
