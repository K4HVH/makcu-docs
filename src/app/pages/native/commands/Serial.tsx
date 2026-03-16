import type { Component } from 'solid-js';
import { Card, CardHeader } from '../../../../components/surfaces/Card';
import '../../../../styles/docs.css';

const Serial: Component = () => {
  return (
    <>
      <div id="serial-spoofing" data-search-target>
        <Card>
          <CardHeader title="Serial Number Spoofing" subtitle="Read and modify the mouse serial number" />
          <div class="callout callout--danger">
            <p>
              This feature has <strong>never been observed to work</strong>. It requires
              specific hardware support from the connected mouse that no tested mouse has
              provided. Multiple mice across different manufacturers all
              return <code>km.Mouse does not have a serial number</code>. The commands
              are accepted by the firmware, but the spoofing has no effect.
            </p>
          </div>
          <p>
            The commands are documented here for completeness. If your mouse does expose
            a serial number slot, these commands may function, but this has not been verified.
          </p>
        </Card>
      </div>

      <div id="serial-commands" data-search-target>
        <Card>
          <CardHeader title="Commands" />
          <table class="api-params">
            <thead>
              <tr>
                <th>Command</th>
                <th>Response</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>km.serial()</code></td>
                <td><span class="api-badge api-badge--responded">RESPONDED</span></td>
                <td>Read current serial number.</td>
              </tr>
              <tr>
                <td><code>km.serial('value')</code></td>
                <td><span class="api-badge api-badge--responded">RESPONDED</span></td>
                <td>Set the serial number (single-quoted string).</td>
              </tr>
              <tr>
                <td><code>km.serial(0)</code></td>
                <td><span class="api-badge api-badge--responded">RESPONDED</span></td>
                <td>Reset to the original serial number.</td>
              </tr>
            </tbody>
          </table>
          <div class="api-response-label">Example</div>
          <pre><code>{`-->  km.serial()\\r\\n\n<--  km.serial()\\r\\nkm.Mouse does not have a serial number\\r\\n>>> `}</code></pre>
        </Card>
      </div>
    </>
  );
};

export default Serial;
