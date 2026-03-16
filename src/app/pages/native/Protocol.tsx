import type { Component } from 'solid-js';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const Protocol: Component = () => {
  return (
    <>
      <Card>
        <CardHeader title="Request Format" subtitle="How commands are sent to the device" />
        <pre class="api-signature">{'km.<command>(<args>)\\r\\n'}</pre>
        <p>
          No spaces anywhere in the command string. Arguments are comma-separated
          with no whitespace.
        </p>
        <div class="callout callout--warning">
          <p>
            The device ignores everything after the closing parenthesis. Do not append
            tracking IDs or other suffixes.
          </p>
        </div>
      </Card>

      <Card>
        <CardHeader title="Response Format" subtitle="How the device replies" />
        <p>
          All responses terminate with the prompt sequence <code>{'>>> '}</code> (four
          bytes: <code>3E 3E 3E 20</code>). There are three response types:
        </p>
        <table class="api-params">
          <thead>
            <tr>
              <th>Response Pattern</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>{'<echo>\\r\\n>>> '}</code></td>
              <td><span class="api-badge api-badge--executed">EXECUTED</span></td>
              <td>Command accepted, no return value.</td>
            </tr>
            <tr>
              <td><code>{'<echo>\\r\\n<value>\\r\\n>>> '}</code></td>
              <td><span class="api-badge api-badge--responded">RESPONDED</span></td>
              <td>Command accepted, returned a value.</td>
            </tr>
            <tr>
              <td><em>(timeout, no prompt)</em></td>
              <td><span class="api-badge api-badge--broken">SILENT</span></td>
              <td>Command not recognised by the firmware.</td>
            </tr>
          </tbody>
        </table>
        <div class="callout callout--info">
          <p>
            <code>km.version()</code> is a special case. It returns <code>km.MAKCU\r\n{'>>> '}</code> with
            no preceding echo line.
          </p>
        </div>
      </Card>

      <Card>
        <CardHeader title="Reading Responses" subtitle="Parsing strategy" />
        <p>
          Read bytes until the <code>{'>>> '}</code> sequence is detected or a
          timeout of <strong>500 ms</strong> expires. There is no framing or length
          prefix; the prompt is the only delimiter.
        </p>
        <p>
          When the button event stream is enabled, raw event bytes are interleaved with
          command responses on the same serial stream. See
          the <a href="/native/commands/stream">Button Stream</a> page for details on
          distinguishing event data from command responses.
        </p>
      </Card>

      <Card>
        <CardHeader title="Examples" />
        <div class="api-response-label">Command with no return value (EXECUTED)</div>
        <pre><code>{`-->  km.left(1)\\r\\n\n<--  km.left(1)\\r\\n>>> `}</code></pre>

        <div class="api-response-label">Command with a return value (RESPONDED)</div>
        <pre><code>{`-->  km.left()\\r\\n\n<--  km.left()\\r\\n0\\r\\n>>> `}</code></pre>

        <div class="api-response-label">Unrecognised command (SILENT)</div>
        <pre><code>{`-->  km.nonexistent()\\r\\n\n<--  (no response within timeout)`}</code></pre>
      </Card>
    </>
  );
};

export default Protocol;
