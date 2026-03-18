import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../../components/surfaces/Card';
import '../../../../styles/docs.css';

const Profile: Component = () => {
  return (
    <>
      <div id="profile-overview" data-search-target>
        <Card>
          <CardHeader title="Profiler" subtitle="Per-command timing statistics" />
          <p>
            The <code>profile</code> feature enables per-command timing measurement.
            When disabled, all profiler code compiles to no-ops with zero runtime overhead.
          </p>
          <pre><code>cargo add makcu --features profile</code></pre>
        </Card>
      </div>

      <div id="profile-usage" data-search-target>
        <Card>
          <CardHeader title="Usage" subtitle="Recording and reading command timings" />
          <p>
            With the feature enabled, every command sent through the library automatically
            records its round-trip time. Use the <code>profiler</code> module to access
            the collected statistics.
          </p>
          <div class="api-response-label">Functions</div>
          <table class="api-params">
            <thead>
              <tr>
                <th>Function</th>
                <th>Returns</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>profiler::stats()</code></td>
                <td><code>HashMap&lt;&str, CommandStat&gt;</code></td>
                <td>All recorded timing statistics.</td>
              </tr>
              <tr>
                <td><code>profiler::reset()</code></td>
                <td><code>()</code></td>
                <td>Clear all recorded statistics.</td>
              </tr>
              <tr>
                <td><code>profiler::record(name, duration)</code></td>
                <td><code>()</code></td>
                <td>Manually record a timing entry.</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div id="command-stat" data-search-target>
        <Card>
          <CardHeader title="CommandStat" subtitle="Per-command timing breakdown" />
          <pre class="api-signature">{`pub struct CommandStat`}</pre>
          <p>See also the <A href="/library/types#feature-types">type reference</A>.</p>
          <table class="api-params">
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>count</code></td><td><code>u64</code></td><td>Number of executions.</td></tr>
              <tr><td><code>total_us</code></td><td><code>u64</code></td><td>Total microseconds across all executions.</td></tr>
              <tr><td><code>avg_us</code></td><td><code>f64</code></td><td>Average microseconds per execution.</td></tr>
              <tr><td><code>min_us</code></td><td><code>u64</code></td><td>Fastest execution in microseconds.</td></tr>
              <tr><td><code>max_us</code></td><td><code>u64</code></td><td>Slowest execution in microseconds.</td></tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div id="profile-example" data-search-target>
        <Card>
          <CardHeader title="Example" subtitle="Benchmarking command performance" />
          <pre><code>{`use makcu::profiler;

// Run a series of commands
for _ in 0..100 {
    device.move_xy(10, 0)?;
}

for _ in 0..50 {
    device.wheel(1)?;
}

// Print timing stats for each command
for (cmd, stat) in profiler::stats() {
    println!(
        "{}: avg={:.0}us min={}us max={}us (n={})",
        cmd, stat.avg_us, stat.min_us, stat.max_us, stat.count,
    );
}

// Reset for the next measurement
profiler::reset();`}</code></pre>
        </Card>
      </div>

      <div id="timed-macro" data-search-target>
        <Card>
          <CardHeader title="timed! Macro" subtitle="Time arbitrary expressions" />
          <pre class="api-signature">{`timed!("label", { expression })`}</pre>
          <p>
            Records the execution time of any expression under the given label.
            When the <code>profile</code> feature is disabled, this compiles to just
            the inner expression with no overhead.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`use makcu::timed;

let result = timed!("custom_operation", {
    device.move_xy(100, 0)?;
    device.move_xy(0, 100)?;
    Ok::<(), makcu::MakcuError>(())
});`}</code></pre>
        </Card>
      </div>

      <div id="zero-cost" data-search-target>
        <Card>
          <CardHeader title="Zero-Cost When Disabled" subtitle="No overhead without the feature" />
          <p>
            When compiled without the <code>profile</code> feature:
          </p>
          <ul>
            <li><code>profiler::record()</code> is a no-op.</li>
            <li><code>profiler::stats()</code> returns an empty map.</li>
            <li><code>profiler::reset()</code> is a no-op.</li>
            <li><code>timed!</code> evaluates to just the inner expression.</li>
          </ul>
          <p>
            This means profiling code can be left in place without affecting release builds.
          </p>
        </Card>
      </div>
    </>
  );
};

export default Profile;
