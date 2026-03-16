import type { Component } from 'solid-js';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const Transport: Component = () => {
  return (
    <>
      <Card>
        <CardHeader title="Serial Transport" subtitle="USB serial interface details" />
        <table class="api-params">
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Interface</td>
              <td>Serial over USB (CDC / virtual COM port)</td>
            </tr>
            <tr>
              <td>USB Chip</td>
              <td>WCH CH340 / CH343</td>
            </tr>
            <tr>
              <td>Device Name</td>
              <td><code>USB-Enhanced-SERIAL CH343</code></td>
            </tr>
            <tr>
              <td>USB VID</td>
              <td><code>0x1A86</code></td>
            </tr>
            <tr>
              <td>USB PID</td>
              <td><code>0x55D3</code></td>
            </tr>
            <tr>
              <td>Default Baud</td>
              <td><code>115200</code></td>
            </tr>
            <tr>
              <td>Operating Baud</td>
              <td><code>4000000</code> (4 Mbaud)</td>
            </tr>
            <tr>
              <td>Line Terminator</td>
              <td><code>\r\n</code></td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card>
        <CardHeader title="Port Identification" subtitle="Finding the MAKCU device" />
        <p>
          The device can be identified by its USB Vendor ID (<code>0x1A86</code>) and
          Product ID (<code>0x55D3</code>). On Linux, it typically appears
          as <code>/dev/ttyACM0</code>. On Windows, it appears as a numbered COM port.
        </p>
        <p>
          The device name reported by the USB descriptor
          is <code>USB-Enhanced-SERIAL CH343</code> or <code>USB Single Serial</code>,
          depending on the driver version.
        </p>
      </Card>

      <Card>
        <CardHeader title="Baud Rate" subtitle="Speed negotiation" />
        <p>
          The device defaults to <strong>115200 baud</strong> on power-up and can be
          switched to <strong>4 Mbaud</strong> via a binary frame. The higher baud rate
          is not persistent across power cycles.
        </p>
        <div class="callout callout--info">
          <p>
            If the device was previously switched to 4 Mbaud within the same power session,
            it will remain at that speed. Always attempt 4 Mbaud first before sending the
            baud change frame. See the <a href="/native/connection">Connection</a> page for
            the full negotiation sequence.
          </p>
        </div>
      </Card>
    </>
  );
};

export default Transport;
