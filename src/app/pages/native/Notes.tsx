import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const Notes: Component = () => {
  return (
    <>
      <div id="behaviour-notes" data-search-target>
        <Card>
          <CardHeader title="Behaviour Notes" subtitle="Implementation details for v3.2 / v3.7" />
        </Card>
      </div>

      <div id="command-tracking" data-search-target>
        <Card>
          <CardHeader title="Command Tracking" />
          <p>
            There is no command ID mechanism. The device ignores anything after the closing
            parenthesis (see <A href="/native/protocol#request-format">request format</A>).
            Responses are returned in the order commands were sent.
          </p>
        </Card>
      </div>

      <div id="lock-state-notes" data-search-target>
        <Card>
          <CardHeader title="Lock State" />
          <p>
            Lock state is not cached in hardware. Always query the device directly
            via <A href="/native/commands/locks#query-lock"><code>km.lock_*()</code></A>. Do not
            rely on a software-side cache, as power cycles or other processes can change state
            without notification.
          </p>
        </Card>
      </div>

      <div id="fire-and-forget" data-search-target>
        <Card>
          <CardHeader title="Fire-and-Forget vs Confirmed" />
          <p>
            Each command should be sent and the <A href="/native/protocol#response-format"><code>{'>>> '}</code> prompt</A> waited for before
            sending the next. Sending without waiting ("fire-and-forget") risks command queueing
            faster than the device processes them, causing response misalignment. The Rust
            library's <A href="/library/fire-and-forget">fire-and-forget mode</A> handles this safely
            by using an internal write coalescing thread.
          </p>
        </Card>
      </div>
    </>
  );
};

export default Notes;
