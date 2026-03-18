import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const DeviceInfo: Component = () => {
  return (
    <>
      <div id="info-overview" data-search-target>
        <Card>
          <CardHeader title="Device Info" subtitle="Version, identification, and serial number" />
          <p>
            Methods for querying device identity and managing the serial number.
          </p>
        </Card>
      </div>

      <div id="version" data-search-target>
        <Card>
          <CardHeader title="version" subtitle="Query firmware version" />
          <pre class="api-signature">{`fn version(&self) -> Result<String>`}</pre>
          <p>
            Returns the firmware version string. The <code>km.</code> prefix is stripped
            automatically. Maps to <A href="/native/commands/version#km-version"><code>km.version()</code></A>.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`let version = device.version()?;
println!("{}", version);  // "MAKCU v3.7"`}</code></pre>
        </Card>
      </div>

      <div id="device-info" data-search-target>
        <Card>
          <CardHeader title="device_info" subtitle="Combined device information" />
          <pre class="api-signature">{`fn device_info(&self) -> Result<DeviceInfo>`}</pre>
          <p>
            Returns a <A href="/library/types#data-structs"><code>DeviceInfo</code></A> struct containing the serial port name and
            firmware version.
          </p>
          <div class="api-response-label">DeviceInfo Fields</div>
          <table class="api-params">
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>port</code></td>
                <td><code>String</code></td>
                <td>Serial port name.</td>
              </tr>
              <tr>
                <td><code>firmware</code></td>
                <td><code>String</code></td>
                <td>Firmware version string.</td>
              </tr>
            </tbody>
          </table>
          <div class="api-response-label">Example</div>
          <pre><code>{`let info = device.device_info()?;
println!("{}", info);  // "/dev/ttyACM0 (firmware: MAKCU v3.7)"`}</code></pre>
        </Card>
      </div>

      <div id="serial-get" data-search-target>
        <Card>
          <CardHeader title="serial" subtitle="Read mouse serial number" />
          <pre class="api-signature">{`fn serial(&self) -> Result<String>`}</pre>
          <p>
            Returns the current mouse serial number. The <code>km.</code> prefix is stripped.
            Maps to <A href="/native/commands/serial#serial-commands"><code>km.serial()</code></A>.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`let serial = device.serial()?;
println!("Serial: {}", serial);`}</code></pre>
        </Card>
      </div>

      <div id="serial-set" data-search-target>
        <Card>
          <CardHeader title="set_serial" subtitle="Spoof the mouse serial number" />
          <pre class="api-signature">{`fn set_serial(&self, value: &str) -> Result<String>`}</pre>
          <p>
            Changes the mouse serial number reported to the host. Maximum 45 characters.
            Returns the new serial number. Maps to <A href="/native/commands/serial#serial-commands"><code>km.serial('value')</code></A>.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`let new_serial = device.set_serial("CUSTOM-001")?;
println!("Set to: {}", new_serial);`}</code></pre>
        </Card>
      </div>

      <div id="serial-reset" data-search-target>
        <Card>
          <CardHeader title="reset_serial" subtitle="Restore factory serial number" />
          <pre class="api-signature">{`fn reset_serial(&self) -> Result<String>`}</pre>
          <p>
            Restores the original factory serial number. Returns the restored value.
            Maps to <A href="/native/commands/serial#serial-commands"><code>km.serial(0)</code></A>.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`let original = device.reset_serial()?;
println!("Restored: {}", original);`}</code></pre>
        </Card>
      </div>
    </>
  );
};

export default DeviceInfo;
