import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const Connection: Component = () => {
  return (
    <>
      <div id="connecting" data-search-target>
        <Card>
          <CardHeader title="Connecting" subtitle="Auto-detect and connect to a MAKCU device" />
          <p>
            Three methods are available for establishing a connection. All handle <A href="/native/connection#baud-change-frame">baud rate
            negotiation</A> automatically.
          </p>
          <div class="api-response-label">Auto-detect</div>
          <pre class="api-signature">{`fn Device::connect() -> Result<Device>`}</pre>
          <p>
            Scans all serial ports for a device matching the MAKCU <A href="/native/transport#serial-transport">USB VID/PID</A>
            (<code>0x1A86:0x55D3</code>). Connects to the first match.
          </p>
          <pre><code>{`use makcu::Device;

let device = Device::connect()?;
println!("Connected to {}", device.port_name());`}</code></pre>

          <div class="api-response-label">Specific Port</div>
          <pre class="api-signature">{`fn Device::connect_port(port: &str) -> Result<Device>`}</pre>
          <p>
            Connects to a known serial port path. Skips auto-detection.
          </p>
          <pre><code>{`let device = Device::connect_port("/dev/ttyACM0")?;`}</code></pre>

          <div class="api-response-label">Custom Configuration</div>
          <pre class="api-signature">{`fn Device::with_config(config: DeviceConfig) -> Result<Device>`}</pre>
          <p>
            Connects using a <A href="/library/connection#device-config"><code>DeviceConfig</code></A> struct for full control over
            connection behaviour.
          </p>
          <pre><code>{`use makcu::{Device, DeviceConfig};
use std::time::Duration;

let config = DeviceConfig {
    port: Some("/dev/ttyACM0".into()),
    try_4m_first: false,
    command_timeout: Duration::from_millis(1000),
    reconnect: true,
    reconnect_backoff: Duration::from_millis(200),
    fire_and_forget: false,
};
let device = Device::with_config(config)?;`}</code></pre>
        </Card>
      </div>

      <div id="device-config" data-search-target>
        <Card>
          <CardHeader title="DeviceConfig" subtitle="Connection configuration options" />
          <pre class="api-signature">{`pub struct DeviceConfig`}</pre>
          <table class="api-params">
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>port</code></td>
                <td><code>Option&lt;String&gt;</code></td>
                <td><code>None</code></td>
                <td>Serial port path. <code>None</code> for auto-detect by VID/PID.</td>
              </tr>
              <tr>
                <td><code>try_4m_first</code></td>
                <td><code>bool</code></td>
                <td><code>true</code></td>
                <td>Attempt 4 Mbaud before falling back to baud change sequence.</td>
              </tr>
              <tr>
                <td><code>command_timeout</code></td>
                <td><code>Duration</code></td>
                <td>500 ms</td>
                <td>Timeout for each command response.</td>
              </tr>
              <tr>
                <td><code>reconnect</code></td>
                <td><code>bool</code></td>
                <td><code>true</code></td>
                <td>Automatically reconnect on disconnect.</td>
              </tr>
              <tr>
                <td><code>reconnect_backoff</code></td>
                <td><code>Duration</code></td>
                <td>100 ms</td>
                <td>Initial backoff delay between reconnection attempts.</td>
              </tr>
              <tr>
                <td><code>fire_and_forget</code></td>
                <td><code>bool</code></td>
                <td><code>false</code></td>
                <td>Make all commands <A href="/library/fire-and-forget">fire-and-forget</A> by default.</td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout--info">
            <p>
              When <code>try_4m_first</code> is <code>true</code> (the default), the library
              first attempts to connect at 4 Mbaud. If the device is already at high speed
              (e.g. from a previous session), this avoids the baud change sequence entirely.
            </p>
          </div>
        </Card>
      </div>

      <div id="connection-state" data-search-target>
        <Card>
          <CardHeader title="Connection State" subtitle="Monitor and manage the connection" />
          <table class="api-params">
            <thead>
              <tr>
                <th>Method</th>
                <th>Returns</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>is_connected()</code></td>
                <td><code>bool</code></td>
                <td>Check whether the device is currently connected.</td>
              </tr>
              <tr>
                <td><code>port_name()</code></td>
                <td><code>String</code></td>
                <td>Get the serial port name.</td>
              </tr>
              <tr>
                <td><code>disconnect()</code></td>
                <td><code>()</code></td>
                <td>Gracefully disconnect and shut down all internal threads.</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div id="connection-events" data-search-target>
        <Card>
          <CardHeader title="Connection Events" subtitle="Subscribe to connection state changes" />
          <pre class="api-signature">{`fn connection_events(&self) -> crossbeam_channel::Receiver<ConnectionState>`}</pre>
          <p>
            Returns a channel receiver that emits <A href="/library/types#enums"><code>ConnectionState</code></A> values
            whenever the connection state changes.
          </p>
          <div class="api-response-label">ConnectionState Variants</div>
          <table class="api-params">
            <thead>
              <tr>
                <th>Variant</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>Disconnected</code></td>
                <td>No active connection.</td>
              </tr>
              <tr>
                <td><code>Connecting</code></td>
                <td>Reconnection attempt in progress.</td>
              </tr>
              <tr>
                <td><code>Connected</code></td>
                <td>Device is connected and ready.</td>
              </tr>
            </tbody>
          </table>
          <pre><code>{`use makcu::ConnectionState;

let rx = device.connection_events();
std::thread::spawn(move || {
    while let Ok(state) = rx.recv() {
        match state {
            ConnectionState::Connected => println!("Connected"),
            ConnectionState::Disconnected => println!("Disconnected"),
            ConnectionState::Connecting => println!("Reconnecting..."),
        }
    }
});`}</code></pre>
        </Card>
      </div>

      <div id="reconnection" data-search-target>
        <Card>
          <CardHeader title="Automatic Reconnection" subtitle="Transparent recovery from disconnects" />
          <p>
            When <code>reconnect</code> is enabled in <A href="/library/connection#device-config"><code>DeviceConfig</code></A> (the default),
            the library automatically attempts to re-establish the connection if the device
            disconnects. Reconnection uses exponential backoff starting
            from <code>reconnect_backoff</code>.
          </p>
          <p>
            During reconnection, commands that require a response will
            return <A href="/library/types#error-variants"><code>MakcuError::NotConnected</code></A>. <A href="/library/fire-and-forget">Fire-and-forget</A> commands are silently
            dropped.
          </p>
          <div class="callout callout--warning">
            <p>
              Automatic reconnection re-opens the same serial port. If the device is plugged
              into a different port after a disconnect, auto-reconnect will not find it.
              Call <code>disconnect()</code> and <code>Device::connect()</code> to re-scan.
            </p>
          </div>
        </Card>
      </div>

      <div id="threading-model" data-search-target>
        <Card>
          <CardHeader title="Threading Model" subtitle="Internal architecture" />
          <p>
            <A href="/library/types#core-types"><code>Device</code></A> is <code>Send + Sync</code> and can be shared
            across threads via <code>Arc</code>. Internally, three threads handle I/O:
          </p>
          <table class="api-params">
            <thead>
              <tr>
                <th>Thread</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Writer</td>
                <td>Coalesces pending commands into single <code>write_all()</code> calls.</td>
              </tr>
              <tr>
                <td>Reader</td>
                <td>Parses responses, routes them to waiting callers, fans out button events.</td>
              </tr>
              <tr>
                <td>Monitor</td>
                <td>Handles automatic reconnection with exponential backoff.</td>
              </tr>
            </tbody>
          </table>
          <p>
            All public methods use channels to communicate with these threads. No method
            requires <code>&mut self</code>.
          </p>
        </Card>
      </div>

      <div id="send-raw" data-search-target>
        <Card>
          <CardHeader title="send_raw" subtitle="Send arbitrary command bytes" />
          <pre class="api-signature">{`fn send_raw(&self, cmd: &[u8]) -> Result<Vec<u8>>`}</pre>
          <p>
            Sends raw bytes to the device and returns the raw response. The command
            must include the <code>\r\n</code> terminator. Use this as an escape hatch for
            firmware commands the library doesn't wrap yet.
          </p>
          <p>
            In <A href="/library/fire-and-forget">fire-and-forget</A> mode the command is sent
            without waiting and an empty <code>Vec</code> is returned.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`// Send a command and read the response
let response = device.send_raw(b"km.version()\\r\\n")?;

// Fire-and-forget — returns immediately
device.ff().send_raw(b"km.left(1)\\r\\n")?;`}</code></pre>
        </Card>
      </div>
    </>
  );
};

export default Connection;
