import type { Component } from 'solid-js';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const LibraryPlaceholder: Component = () => {
  return (
    <>
      <Card>
        <CardHeader title="Library Documentation" subtitle="MAKCU Rust library" />
        <p>
          This section is in progress. It will contain the API reference, usage guides,
          and examples for the MAKCU Rust library.
        </p>
      </Card>
    </>
  );
};

export default LibraryPlaceholder;
