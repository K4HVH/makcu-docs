import type { Component } from 'solid-js';
import { Card, CardHeader } from '../../../../components/surfaces/Card';
import '../../../../styles/docs.css';

const Serial: Component = () => {
  return (
    <>
      <Card>
        <CardHeader title="Serial Number Spoofing" subtitle="Read and modify the mouse serial number" />
        <p>
          These commands read or modify the serial number that the device presents for
          the connected mouse. All three forms return a response string.
        </p>
        <div class="callout callout--danger">
          <p>
            Serial spoofing <strong>requires hardware support from the connected mouse</strong>.
            If the mouse has no serial number slot in its firmware, all forms
            return <code>km.Mouse does not have a serial number</code> and the spoofing
            has no effect. In testing, the connected mouse did not support this feature.
            The commands are accepted by the firmware but the actual spoofing does not
            take effect.
          </p>
        </div>
      </Card>

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
              <td>Read current serial number. Returns the serial string or an error message if the mouse does not support serial numbers.</td>
            </tr>
            <tr>
              <td><code>km.serial('value')</code></td>
              <td><span class="api-badge api-badge--responded">RESPONDED</span></td>
              <td>Set the serial number to the given string (single-quoted). Has no effect if the mouse does not support it.</td>
            </tr>
            <tr>
              <td><code>km.serial(0)</code></td>
              <td><span class="api-badge api-badge--responded">RESPONDED</span></td>
              <td>Reset to the original serial number. Has no effect if the mouse does not support it.</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card variant="subtle">
        <CardHeader title="Example" />
        <pre><code>{`-->  km.serial()\\r\\n\n<--  km.serial()\\r\\nkm.Mouse does not have a serial number\\r\\n>>> `}</code></pre>
        <p class="text-sm text-muted">
          The command is processed correctly by the firmware regardless. Whether the
          spoofing takes effect depends entirely on the connected mouse hardware.
        </p>
      </Card>
    </>
  );
};

export default Serial;
