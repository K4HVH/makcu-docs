import type { Component } from 'solid-js';
import { Card, CardHeader } from '../../../../components/surfaces/Card';
import '../../../../styles/docs.css';

const Version: Component = () => {
  return (
    <>
      <Card>
        <CardHeader title="km.version()" subtitle="Firmware identification" />
        <pre class="api-signature">km.version()\r\n</pre>
        <div class="api-response-label">Response Type</div>
        <span class="api-badge api-badge--responded">RESPONDED</span>
        <p>
          Returns the firmware identifier string. This command is used to verify
          that the device is connected and responsive.
        </p>
        <div class="api-response-label">Parameters</div>
        <p class="text-muted text-sm">None.</p>
        <div class="api-response-label">Return Value</div>
        <p>The string <code>km.MAKCU</code>.</p>
        <div class="api-response-label">Example</div>
        <pre><code>{`-->  km.version()\\r\\n\n<--  km.MAKCU\\r\\n>>> `}</code></pre>
        <div class="callout callout--info">
          <p>
            Unlike other commands, <code>km.version()</code> does not echo the command
            back before the return value. The response begins directly
            with <code>km.MAKCU</code>.
          </p>
        </div>
      </Card>
    </>
  );
};

export default Version;
