import type { Component } from 'solid-js';
import { GridBackground } from '../../components/surfaces/GridBackground';
import { Card, CardHeader } from '../../components/surfaces/Card';
import { Button } from '../../components/inputs/Button';

const Home: Component = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <GridBackground />
    </div>
  );
};

export default Home;
