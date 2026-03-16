import type { Component } from 'solid-js';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const Notes: Component = () => {
  return (
    <>
      <Card>
        <CardHeader title="Behaviour Notes" subtitle="Important implementation details" />
        <p>
          These notes cover firmware behaviour that may not be obvious from the command
          reference alone. They apply to firmware v3.2 (left) / v3.7 (right).
        </p>
      </Card>

      <Card>
        <CardHeader title="Command Tracking" />
        <p>
          There is no command ID tracking mechanism. The device silently ignores
          anything appended after the closing parenthesis of a command. Do not
          append <code>#id</code> suffixes or other tracking markers.
        </p>
        <p>
          Command responses are returned in order. If multiple commands are sent
          before reading responses, the responses will arrive in the same order
          they were sent.
        </p>
      </Card>

      <Card>
        <CardHeader title="Lock State" />
        <p>
          Lock state is not cached in hardware. If you need the current lock state,
          always query the device directly. Do not rely on a software-side cache, as
          external factors (power cycle, another process) can change the state without
          your software's knowledge.
        </p>
      </Card>

      <Card>
        <CardHeader title="Stream Interleaving" />
        <p>
          The button event stream and command responses share the same byte stream.
          When <code>km.buttons(1)</code> is active, event bytes are interleaved with
          normal command responses. Any parser reading command responses must account
          for the presence of stream data if the stream is enabled.
        </p>
        <p>
          See the <a href="/native/commands/stream">Button Stream</a> page for the
          recommended parsing strategy.
        </p>
      </Card>

      <Card>
        <CardHeader title="Button Release Behaviour" />
        <p>
          <code>{'km.<button>(0)'}</code> performs a "soft" release. It clears the
          software-held state but does not override an active physical press. If the
          user is physically holding the button, it will remain in the pressed state.
        </p>
        <p>
          Use <code>{'km.<button>(2)'}</code> to force-release a button regardless of
          physical state. This is useful for ensuring a clean state when software needs
          to guarantee the button is released.
        </p>
      </Card>

      <Card>
        <CardHeader title="Auto-Enable Behaviour" />
        <p>
          The button event stream (<code>km.buttons(1)</code>) should not be
          auto-enabled on connect. Only enable it when the calling application
          explicitly needs button events. Enabling the stream adds overhead to the
          serial link and requires the parser to handle interleaved data.
        </p>
      </Card>

      <Card>
        <CardHeader title="Fire-and-Forget vs Confirmed" />
        <p>
          By default, each command should be sent and the <code>{'>>> '}</code> prompt
          should be waited for before sending the next command. This "confirmed" mode
          ensures commands are processed in order and responses are correctly attributed.
        </p>
        <p>
          Sending commands without waiting for the prompt ("fire-and-forget") is possible
          but carries risk: commands can queue faster than the device processes them,
          causing response misalignment. The firmware developer recommends against this
          approach for general use.
        </p>
      </Card>
    </>
  );
};

export default Notes;
