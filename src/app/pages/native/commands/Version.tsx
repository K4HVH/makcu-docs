import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../../components/surfaces/Card';
import '../../../../styles/docs.css';

const Version: Component = () => {
  return (
    <>
      <div id="km-version" data-search-target>
        <Card>
          <CardHeader title="km.version()" subtitle="Firmware identification" />
          <pre class="api-signature">km.version()\r\n</pre>
          <div class="api-response-label">Response Type</div>
          <span class="api-badge api-badge--responded">RESPONDED</span>
          <p>
            Returns the firmware identifier string. See also the Rust library's <A href="/library/info#version"><code>version()</code></A> method.
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
              back before the return value (see <A href="/native/protocol#response-format">response format</A>).
              The response begins directly with <code>km.MAKCU</code>. This command is used
              during the <A href="/native/connection#connection-sequence">connection sequence</A> to
              verify the device is present.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Version;
