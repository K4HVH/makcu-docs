import type { Component } from 'solid-js';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const Connection: Component = () => {
  return (
    <>
      <div id="connection-sequence" data-search-target>
        <Card>
          <CardHeader title="Connection Sequence" subtitle="Establishing communication with the device" />
          <ol>
            <li>Open the port at <strong>4 Mbaud</strong>.</li>
            <li>Send <code>km.version()\r\n</code>.</li>
            <li>If the response contains <code>km.MAKCU</code>, the connection is established.</li>
            <li>Otherwise, close the port and proceed with the baud change sequence:
              <ol style={{ "margin-top": "var(--g-spacing-sm)", "list-style-type": "lower-alpha" }}>
                <li>Open the port at <strong>115200</strong>.</li>
                <li>Send the binary baud change frame (9 bytes, no <code>\r\n</code>).</li>
                <li>Wait <strong>100 ms</strong>.</li>
                <li>Close the port.</li>
                <li>Open the port at <strong>4 Mbaud</strong>.</li>
                <li>Wait <strong>50 ms</strong>, then flush the input buffer.</li>
                <li>Send <code>km.version()\r\n</code>.</li>
                <li>Verify the response contains <code>km.MAKCU</code>.</li>
              </ol>
            </li>
          </ol>
          <div class="callout callout--info">
            <p>
              Timeout is <strong>500 ms</strong>. If no response is received, the connection
              attempt has failed. Retry the full sequence or verify the physical connection.
            </p>
          </div>
        </Card>
      </div>

      <div id="baud-change-frame" data-search-target>
        <Card>
          <CardHeader title="Baud Change Frame" subtitle="Binary frame to switch from 115200 to 4 Mbaud" />
          <pre class="api-signature">DE AD 05 00 A5 00 09 3D 00</pre>
          <p>
            Sent as raw bytes at 115200 baud. Do not append a <code>\r\n</code> terminator.
          </p>
          <table class="byte-table">
            <thead>
              <tr>
                <th>Offset</th>
                <th>Length</th>
                <th>Bytes</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td>
                <td>2</td>
                <td>DE AD</td>
                <td>Magic header</td>
              </tr>
              <tr>
                <td>2</td>
                <td>2</td>
                <td>05 00</td>
                <td>Payload length (little-endian u16) = 5</td>
              </tr>
              <tr>
                <td>4</td>
                <td>1</td>
                <td>A5</td>
                <td>Command: set baud rate</td>
              </tr>
              <tr>
                <td>5</td>
                <td>4</td>
                <td>00 09 3D 00</td>
                <td>Target baud rate (little-endian u32) = 4,000,000</td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout--warning">
            <p>
              The baud rate is not persistent across power cycles. Persistence requires a
              physical button press on the device and is not software-controllable.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Connection;
