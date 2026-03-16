import type { Component } from 'solid-js';
import { Card, CardHeader } from '../../../../components/surfaces/Card';
import '../../../../styles/docs.css';

const Wheel: Component = () => {
  return (
    <>
      <Card>
        <CardHeader title="km.wheel(n)" subtitle="Scroll wheel input" />
        <pre class="api-signature">km.wheel(n)\r\n</pre>
        <div class="api-response-label">Response Type</div>
        <span class="api-badge api-badge--executed">EXECUTED</span>
        <p>
          Scrolls by <code>n</code> units. Positive values scroll up, negative values
          scroll down. Actual direction may vary with OS scroll settings.
        </p>
        <div class="api-response-label">Parameters</div>
        <table class="api-params">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>n</code></td>
              <td>int</td>
              <td>Scroll delta. No firmware-level clamping.</td>
            </tr>
          </tbody>
        </table>
        <div class="api-response-label">Example</div>
        <pre><code>{`-->  km.wheel(3)\\r\\n\n<--  km.wheel(3)\\r\\n>>> `}</code></pre>
      </Card>
    </>
  );
};

export default Wheel;
