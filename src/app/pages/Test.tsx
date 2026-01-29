import type { Component } from 'solid-js';
import { GridBackground } from '../../components/GridBackground';
import { getCSSVariable } from '../../utils/cssVariables';

const Test: Component = () => {
  return (
    <>
      <GridBackground
        gridSize={10}
        gridColor={getCSSVariable('--color-gray-900')}
      />
      <div class="content">
        {/* Content will go here */}
      </div>
    </>
  );
};

export default Test;
