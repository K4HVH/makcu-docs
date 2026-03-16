import type { Component } from 'solid-js';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const LibraryPlaceholder: Component = () => {
  return (
    <>
      <div class="docs-hero">
        <h2>Library Documentation</h2>
        <p>
          Documentation for the MAKCU Rust library is in progress.
        </p>
      </div>

      <Card variant="subtle">
        <CardHeader title="Under Construction" />
        <p>
          This section will contain the API reference, usage guides, and examples for the
          MAKCU Rust library. Check back soon.
        </p>
      </Card>
    </>
  );
};

export default LibraryPlaceholder;
