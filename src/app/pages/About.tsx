import type { Component } from 'solid-js';
import { A } from '@solidjs/router';

const About: Component = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is a scaffold for building high-performance SolidJS applications.</p>
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

export default About;
