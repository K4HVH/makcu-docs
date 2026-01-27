import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import Comp from '../Comp';

const Home: Component = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to your SolidJS application!</p>
      <Comp />
      <nav>
        <ul>
          <li>
            <A href="/about">Go to About</A>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
