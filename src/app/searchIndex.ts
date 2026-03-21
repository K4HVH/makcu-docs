import type { Component } from 'solid-js';
import type { CommandPaletteItem } from '../components/navigation/CommandPalette';
import {
  BsInfoCircle, BsCpu, BsPlug, BsLink45deg, BsTerminal,
  BsCheckCircle, BsCursor, BsArrowsMove, BsMouse, BsLock,
  BsBroadcast, BsUpcScan, BsFunnel, BsExclamationTriangle, BsJournalText,
  BsBook, BsLightning, BsStack, BsStars, BsArrowRepeat,
  BsWrench, BsFileCode, BsSpeedometer,
} from 'solid-icons/bs';

interface SearchEntry {
  label: string;
  description?: string;
  path: string;
  group: string;
  icon?: Component;
  tags?: string[];
  keywords?: string[];
}

const entries: SearchEntry[] = [
  // ── Pages: Overview ─────────────────────────────────────────────────────

  {
    label: 'Introduction',
    description: 'Native API overview and firmware reference',
    path: '/native',
    group: 'Overview',
    icon: BsInfoCircle,
    keywords: ['home', 'start', 'getting started', 'v3.2', 'v3.7', 'native api'],
  },
  {
    label: 'Hardware Architecture',
    description: 'USB ports, chips, and LED indicators',
    path: '/native/hardware',
    group: 'Overview',
    icon: BsCpu,
    keywords: ['usb', 'esp32', 'left chip', 'right chip', 'led', 'com port', 'device layout'],
  },
  {
    label: 'Transport',
    description: 'Serial interface, baud rates, USB identification',
    path: '/native/transport',
    group: 'Overview',
    icon: BsPlug,
    keywords: ['serial', 'baud', 'vid', 'pid', 'CH343', 'ttyACM0', 'usb'],
  },
  {
    label: 'Connection Sequence',
    description: 'Baud negotiation and connection establishment',
    path: '/native/connection',
    group: 'Overview',
    icon: BsLink45deg,
    keywords: ['connect', 'handshake', 'negotiate', 'baud change'],
  },
  {
    label: 'Command Protocol',
    description: 'Request format, response types, and parsing',
    path: '/native/protocol',
    group: 'Overview',
    icon: BsTerminal,
    keywords: ['request', 'response', 'EXECUTED', 'RESPONDED', 'SILENT', 'prompt', 'parsing'],
  },

  // ── Pages: Commands ─────────────────────────────────────────────────────

  {
    label: 'Version',
    description: 'Firmware identification command',
    path: '/native/commands/version',
    group: 'Commands',
    icon: BsCheckCircle,
    keywords: ['version', 'km.version', 'identify', 'km.MAKCU'],
  },
  {
    label: 'Mouse Buttons',
    description: 'Query and control button states',
    path: '/native/commands/buttons',
    group: 'Commands',
    icon: BsCursor,
    keywords: ['left', 'right', 'middle', 'ms1', 'ms2', 'click', 'press', 'release', 'button'],
  },
  {
    label: 'Mouse Movement',
    description: 'Relative cursor movement and drag',
    path: '/native/commands/movement',
    group: 'Commands',
    icon: BsArrowsMove,
    keywords: ['move', 'cursor', 'position', 'silent', 'drag'],
  },
  {
    label: 'Scroll Wheel',
    description: 'Scroll wheel input',
    path: '/native/commands/wheel',
    group: 'Commands',
    icon: BsMouse,
    keywords: ['scroll', 'wheel', 'km.wheel'],
  },
  {
    label: 'Input Locks',
    description: 'Block axes and buttons from reaching the host',
    path: '/native/commands/locks',
    group: 'Commands',
    icon: BsLock,
    keywords: ['lock', 'block', 'intercept', 'filter', 'axis'],
  },
  {
    label: 'Button Event Stream',
    description: 'Asynchronous button state change events',
    path: '/native/commands/stream',
    group: 'Commands',
    icon: BsBroadcast,
    keywords: ['stream', 'events', 'bitmask', 'async', 'realtime', 'km.buttons'],
  },
  {
    label: 'Button Capture',
    description: 'Per-button press/release event stream while locked',
    path: '/native/commands/catch',
    group: 'Commands',
    icon: BsFunnel,
    keywords: ['catch', 'capture', 'stream', 'press', 'release', 'lock', 'km.catch_ml'],
  },
  {
    label: 'Serial Number Spoofing',
    description: 'Read and modify the mouse serial number',
    path: '/native/commands/serial',
    group: 'Commands',
    icon: BsUpcScan,
    tags: ['Unverified'],
    keywords: ['serial', 'spoof', 'km.serial'],
  },

  // ── Pages: Reference ────────────────────────────────────────────────────

  {
    label: 'Known Issues',
    description: 'Non-functional commands on v3.2 / v3.7',
    path: '/native/broken',
    group: 'Reference',
    icon: BsExclamationTriangle,
    keywords: ['broken', 'silent', 'bug', 'issue', 'non-functional'],
  },
  {
    label: 'Behaviour Notes',
    description: 'Implementation details and firmware behaviour',
    path: '/native/notes',
    group: 'Reference',
    icon: BsJournalText,
    keywords: ['notes', 'behaviour', 'fire and forget', 'tracking'],
  },

  // ── Pages: Library ──────────────────────────────────────────────────────

  {
    label: 'Rust Library',
    description: 'MAKCU Rust library documentation',
    path: '/library',
    group: 'Rust Library',
    icon: BsBook,
    keywords: ['rust', 'library', 'crate', 'makcu', 'cargo'],
  },
  {
    label: 'Connection (Rust)',
    description: 'Auto-detect, connect, configure, and reconnect',
    path: '/library/connection',
    group: 'Rust Library',
    icon: BsLink45deg,
    keywords: ['connect', 'device', 'config', 'serial', 'port', 'reconnect'],
  },
  {
    label: 'Movement (Rust)',
    description: 'move_xy, silent_move, and wheel',
    path: '/library/movement',
    group: 'Rust Library',
    icon: BsArrowsMove,
    keywords: ['move', 'cursor', 'wheel', 'scroll', 'silent', 'move_xy'],
  },
  {
    label: 'Buttons (Rust)',
    description: 'Press, release, and query button states',
    path: '/library/buttons',
    group: 'Rust Library',
    icon: BsCursor,
    keywords: ['button', 'press', 'release', 'click', 'button_down', 'button_up'],
  },
  {
    label: 'Locks (Rust)',
    description: 'Lock and unlock mouse inputs',
    path: '/library/locks',
    group: 'Rust Library',
    icon: BsLock,
    keywords: ['lock', 'unlock', 'block', 'LockTarget', 'set_lock', 'lock_state'],
  },
  {
    label: 'Device Info',
    description: 'Version, device info, and serial number',
    path: '/library/info',
    group: 'Rust Library',
    icon: BsCheckCircle,
    keywords: ['version', 'info', 'serial', 'firmware', 'device_info'],
  },
  {
    label: 'Button Stream (Rust)',
    description: 'Real-time button state change events',
    path: '/library/stream',
    group: 'Rust Library',
    icon: BsBroadcast,
    keywords: ['stream', 'events', 'button_events', 'ButtonMask', 'subscribe'],
  },
  {
    label: 'Button Capture (Rust)',
    description: 'Per-button press/release event stream while locked',
    path: '/library/catch',
    group: 'Rust Library',
    icon: BsFunnel,
    keywords: ['catch', 'capture', 'stream', 'press', 'release', 'lock', 'enable_catch', 'CatchEvent'],
  },
  {
    label: 'Fire and Forget',
    description: 'Send commands without waiting for responses',
    path: '/library/fire-and-forget',
    group: 'Rust Library',
    icon: BsLightning,
    keywords: ['ff', 'fire', 'forget', 'fast', 'no wait', 'FireAndForget'],
  },
  {
    label: 'Async',
    description: 'Full async parity with Tokio',
    path: '/library/features/async',
    group: 'Rust Library',
    icon: BsArrowRepeat,
    keywords: ['async', 'await', 'tokio', 'AsyncDevice', 'future'],
  },
  {
    label: 'Batch',
    description: 'Fluent command sequences with automatic coalescing',
    path: '/library/features/batch',
    group: 'Rust Library',
    icon: BsStack,
    keywords: ['batch', 'builder', 'coalesce', 'sequence', 'BatchBuilder'],
  },
  {
    label: 'Extras',
    description: 'Click, smooth move, drag, patterns, and event callbacks',
    path: '/library/features/extras',
    group: 'Rust Library',
    icon: BsStars,
    keywords: ['extras', 'click', 'smooth', 'drag', 'pattern', 'callback', 'event'],
  },
  {
    label: 'Mock',
    description: 'In-process mock transport for testing without hardware',
    path: '/library/features/mock',
    group: 'Rust Library',
    icon: BsWrench,
    keywords: ['mock', 'test', 'MockTransport', 'unit test', 'ci'],
  },
  {
    label: 'Profile',
    description: 'Per-command timing statistics',
    path: '/library/features/profile',
    group: 'Rust Library',
    icon: BsSpeedometer,
    keywords: ['profiler', 'timing', 'stats', 'CommandStat', 'performance', 'benchmark'],
  },
  {
    label: 'Types and Errors',
    description: 'Complete type reference and error handling',
    path: '/library/types',
    group: 'Rust Library',
    icon: BsFileCode,
    keywords: ['types', 'errors', 'MakcuError', 'Result', 'enum', 'struct'],
  },

  // ── Library: Getting Started Sections ─────────────────────────────────

  {
    label: 'Installation',
    description: 'Add makcu to your Rust project',
    path: '/library#installation',
    group: 'Rust Library',
    keywords: ['install', 'cargo add', 'dependency', 'features'],
  },
  {
    label: 'Quick Start',
    description: 'Connect and send commands in five lines',
    path: '/library#quick-start',
    group: 'Rust Library',
    keywords: ['quick start', 'example', 'hello world', 'getting started'],
  },
  {
    label: 'Feature Flags',
    description: 'async, batch, extras, profile, mock',
    path: '/library#installation',
    group: 'Rust Library',
    keywords: ['feature', 'flag', 'async', 'batch', 'extras', 'profile', 'mock', 'cfg'],
  },

  // ── Library: Connection Sections ──────────────────────────────────────

  {
    label: 'Device::connect()',
    description: 'Auto-detect and connect to a MAKCU device',
    path: '/library/connection#connecting',
    group: 'Connection (Rust)',
    keywords: ['connect', 'auto', 'detect', 'vid', 'pid', 'scan'],
  },
  {
    label: 'Device::connect_port()',
    description: 'Connect to a specific serial port path',
    path: '/library/connection#connecting',
    group: 'Connection (Rust)',
    keywords: ['connect', 'port', 'path', 'ttyACM0', 'COM', 'connect_port'],
  },
  {
    label: 'Device::with_config()',
    description: 'Connect with custom DeviceConfig',
    path: '/library/connection#device-config',
    group: 'Connection (Rust)',
    keywords: ['config', 'with_config', 'custom', 'options', 'configure'],
  },
  {
    label: 'DeviceConfig',
    description: 'Connection configuration options',
    path: '/library/connection#device-config',
    group: 'Connection (Rust)',
    keywords: ['config', 'timeout', 'reconnect', 'backoff', 'baud', 'try_4m_first'],
  },
  {
    label: 'disconnect() / is_connected() / port_name()',
    description: 'Connection state and lifecycle methods',
    path: '/library/connection#connection-state',
    group: 'Connection (Rust)',
    keywords: ['disconnect', 'is_connected', 'port_name', 'state', 'lifecycle'],
  },
  {
    label: 'Connection Events',
    description: 'Subscribe to connection state changes',
    path: '/library/connection#connection-events',
    group: 'Connection (Rust)',
    keywords: ['connection', 'events', 'state', 'ConnectionState', 'subscribe', 'channel'],
  },
  {
    label: 'Automatic Reconnection',
    description: 'Transparent recovery from disconnects',
    path: '/library/connection#reconnection',
    group: 'Connection (Rust)',
    keywords: ['reconnect', 'auto', 'backoff', 'disconnect', 'recovery'],
  },
  {
    label: 'Threading Model',
    description: 'Internal architecture: writer, reader, monitor threads',
    path: '/library/connection#threading-model',
    group: 'Connection (Rust)',
    keywords: ['thread', 'send', 'sync', 'arc', 'concurrent', 'writer', 'reader'],
  },
  {
    label: 'send_raw()',
    description: 'Send arbitrary raw command bytes to the device',
    path: '/library/connection#send-raw',
    group: 'Connection (Rust)',
    keywords: ['raw', 'send', 'bytes', 'send_raw', 'custom', 'escape', 'firmware'],
  },

  // ── Library: Movement Sections ──────────────────────────────────────

  {
    label: 'move_xy()',
    description: 'Relative cursor movement',
    path: '/library/movement#move-xy',
    group: 'Movement (Rust)',
    keywords: ['move', 'cursor', 'relative', 'x', 'y', 'move_xy'],
  },
  {
    label: 'silent_move()',
    description: 'Atomic drag operation via km.silent',
    path: '/library/movement#silent-move',
    group: 'Movement (Rust)',
    keywords: ['silent', 'drag', 'atomic', 'hid frame', 'silent_move'],
  },
  {
    label: 'wheel() (Rust)',
    description: 'Scroll wheel input',
    path: '/library/movement#wheel',
    group: 'Movement (Rust)',
    keywords: ['wheel', 'scroll', 'up', 'down', 'delta'],
  },

  // ── Library: Button Sections ────────────────────────────────────────

  {
    label: 'button_down()',
    description: 'Press and hold a button',
    path: '/library/buttons#button-down',
    group: 'Buttons (Rust)',
    keywords: ['button', 'down', 'press', 'hold', 'button_down'],
  },
  {
    label: 'button_up()',
    description: 'Soft release a button',
    path: '/library/buttons#button-up',
    group: 'Buttons (Rust)',
    keywords: ['button', 'up', 'release', 'soft', 'button_up'],
  },
  {
    label: 'button_up_force()',
    description: 'Force release a button regardless of physical state',
    path: '/library/buttons#button-up-force',
    group: 'Buttons (Rust)',
    keywords: ['button', 'force', 'release', 'override', 'button_up_force'],
  },
  {
    label: 'button_state()',
    description: 'Query whether a button is currently pressed',
    path: '/library/buttons#button-state',
    group: 'Buttons (Rust)',
    keywords: ['button', 'state', 'query', 'pressed', 'released', 'button_state'],
  },

  // ── Library: Lock Sections ──────────────────────────────────────────

  {
    label: 'set_lock()',
    description: 'Enable or disable an input lock',
    path: '/library/locks#set-lock',
    group: 'Locks (Rust)',
    keywords: ['lock', 'set', 'enable', 'disable', 'set_lock'],
  },
  {
    label: 'lock_state()',
    description: 'Query a single lock state',
    path: '/library/locks#lock-state',
    group: 'Locks (Rust)',
    keywords: ['lock', 'query', 'state', 'lock_state'],
  },
  {
    label: 'lock_states_all()',
    description: 'Query all seven lock states at once',
    path: '/library/locks#lock-states-all',
    group: 'Locks (Rust)',
    keywords: ['lock', 'all', 'states', 'LockStates', 'lock_states_all'],
  },

  // ── Library: Device Info Sections ───────────────────────────────────

  {
    label: 'version() (Rust)',
    description: 'Query firmware version string',
    path: '/library/info#version',
    group: 'Device Info (Rust)',
    keywords: ['version', 'firmware', 'identify'],
  },
  {
    label: 'device_info()',
    description: 'Get combined port and firmware info',
    path: '/library/info#device-info',
    group: 'Device Info (Rust)',
    keywords: ['info', 'port', 'firmware', 'DeviceInfo', 'device_info'],
  },
  {
    label: 'serial() / set_serial() / reset_serial()',
    description: 'Read, set, or reset mouse serial number',
    path: '/library/info#serial-get',
    group: 'Device Info (Rust)',
    keywords: ['serial', 'spoof', 'set', 'reset', 'factory'],
  },

  // ── Library: Stream Sections ────────────────────────────────────────

  {
    label: 'enable_button_stream() / disable_button_stream()',
    description: 'Control the button event stream on the device',
    path: '/library/stream#stream-enable',
    group: 'Stream (Rust)',
    keywords: ['enable', 'disable', 'stream', 'start', 'stop', 'button_stream_state'],
  },
  {
    label: 'button_events()',
    description: 'Subscribe to button state change channel',
    path: '/library/stream#button-events',
    group: 'Stream (Rust)',
    keywords: ['button', 'events', 'subscribe', 'channel', 'receiver', 'button_events'],
  },
  {
    label: 'ButtonMask',
    description: 'Button state snapshot with per-button accessors',
    path: '/library/stream#button-mask',
    group: 'Stream (Rust)',
    keywords: ['ButtonMask', 'bitmask', 'left', 'right', 'middle', 'raw'],
  },

  // ── Library: Catch Sections ───────────────────────────────────────

  {
    label: 'Catch Overview',
    description: 'Per-button press/release event stream requiring lock',
    path: '/library/catch#catch-overview',
    group: 'Catch (Rust)',
    keywords: ['catch', 'capture', 'overview', 'lock', 'per-button', 'stream'],
  },
  {
    label: 'enable_catch()',
    description: 'Enable catch for a specific button',
    path: '/library/catch#enable-catch',
    group: 'Catch (Rust)',
    keywords: ['enable_catch', 'catch', 'button', 'start', 'enable'],
  },
  {
    label: 'catch_events()',
    description: 'Subscribe to catch event channel',
    path: '/library/catch#catch-events',
    group: 'Catch (Rust)',
    keywords: ['catch_events', 'subscribe', 'channel', 'receiver', 'CatchEvent'],
  },
  {
    label: 'CatchEvent',
    description: 'Per-button press/release event struct',
    path: '/library/catch#catch-event-type',
    group: 'Catch (Rust)',
    keywords: ['CatchEvent', 'button', 'pressed', 'event', 'struct'],
  },
  {
    label: 'Catch vs Stream',
    description: 'Comparison of ButtonStream and Catch APIs',
    path: '/library/catch#catch-vs-stream',
    group: 'Catch (Rust)',
    keywords: ['catch', 'stream', 'comparison', 'difference', 'ButtonMask', 'CatchEvent'],
  },

  // ── Library: Fire-and-Forget Sections ───────────────────────────────

  {
    label: 'ff() Guard',
    description: 'Fire-and-forget RAII guard, derefs to Device',
    path: '/library/fire-and-forget#ff-wrapper',
    group: 'Fire-and-Forget (Rust)',
    keywords: ['ff', 'guard', 'fire', 'forget', 'no response', 'deref', 'RAII'],
  },
  {
    label: 'How FF Works',
    description: 'Thread-local RAII guard design',
    path: '/library/fire-and-forget#ff-methods',
    group: 'Fire-and-Forget (Rust)',
    keywords: ['ff', 'thread-local', 'RAII', 'deref', 'extras', 'all methods'],
  },
  {
    label: 'Raw Commands in FF',
    description: 'send_raw with fire-and-forget mode',
    path: '/library/fire-and-forget#ff-raw',
    group: 'Fire-and-Forget (Rust)',
    keywords: ['raw', 'send', 'ff', 'send_raw', 'fire', 'forget'],
  },

  // ── Library: Async Sections ─────────────────────────────────────────

  {
    label: 'AsyncDevice',
    description: 'Async equivalent of Device with Tokio',
    path: '/library/features/async#async-connecting',
    group: 'Async (Rust)',
    keywords: ['AsyncDevice', 'async', 'tokio', 'await', 'connect'],
  },
  {
    label: 'Async Methods',
    description: 'All device methods have async equivalents',
    path: '/library/features/async#async-methods',
    group: 'Async (Rust)',
    keywords: ['async', 'await', 'move_xy', 'button_down', 'wheel', 'methods'],
  },
  {
    label: 'AsyncFireAndForget',
    description: 'Async fire-and-forget wrapper',
    path: '/library/features/async#async-ff',
    group: 'Async (Rust)',
    keywords: ['async', 'ff', 'fire', 'forget', 'AsyncFireAndForget'],
  },
  {
    label: 'AsyncBatchBuilder',
    description: 'Async batch command sequences',
    path: '/library/features/async#async-batch',
    group: 'Async (Rust)',
    keywords: ['async', 'batch', 'builder', 'execute', 'await', 'AsyncBatchBuilder'],
  },
  {
    label: 'Async Extras',
    description: 'Async versions of click, move_smooth, drag',
    path: '/library/features/async#async-extras',
    group: 'Async (Rust)',
    keywords: ['async', 'extras', 'click', 'smooth', 'drag'],
  },
  {
    label: 'Synchronous Methods on AsyncDevice',
    description: 'disconnect, is_connected, port_name, ff, batch',
    path: '/library/features/async#async-sync-methods',
    group: 'Async (Rust)',
    keywords: ['sync', 'synchronous', 'disconnect', 'is_connected', 'ff', 'batch', 'not async'],
  },

  // ── Library: Batch Sections ─────────────────────────────────────────

  {
    label: 'Batch Usage',
    description: 'Build and execute command sequences',
    path: '/library/features/batch#batch-usage',
    group: 'Batch (Rust)',
    keywords: ['batch', 'usage', 'builder', 'execute', 'chain', 'fluent'],
  },
  {
    label: 'Batch Native Commands',
    description: 'move_xy, wheel, button_down, set_lock in batches',
    path: '/library/features/batch#batch-methods',
    group: 'Batch (Rust)',
    keywords: ['batch', 'native', 'commands', 'move_xy', 'wheel', 'button'],
  },
  {
    label: 'Batch Extras Commands',
    description: 'click, move_smooth, drag in batches',
    path: '/library/features/batch#batch-extras',
    group: 'Batch (Rust)',
    keywords: ['batch', 'extras', 'click', 'smooth', 'drag', 'timing'],
  },
  {
    label: 'Command Coalescing',
    description: 'How batch builder merges consecutive commands',
    path: '/library/features/batch#batch-coalescing',
    group: 'Batch (Rust)',
    keywords: ['coalesce', 'merge', 'batch', 'consecutive', 'write'],
  },
  {
    label: 'Batch Execution',
    description: 'execute() consumes the builder and sends commands',
    path: '/library/features/batch#batch-execution',
    group: 'Batch (Rust)',
    keywords: ['execute', 'batch', 'send', 'consume', 'run'],
  },

  // ── Library: Extras Sections ────────────────────────────────────────

  {
    label: 'click()',
    description: 'Press, hold, and release with controlled timing',
    path: '/library/features/extras#click',
    group: 'Extras (Rust)',
    keywords: ['click', 'hold', 'duration', 'extras'],
  },
  {
    label: 'click_sequence()',
    description: 'Repeated clicks with intervals',
    path: '/library/features/extras#click-sequence',
    group: 'Extras (Rust)',
    keywords: ['click', 'sequence', 'repeat', 'double', 'triple'],
  },
  {
    label: 'move_smooth()',
    description: 'Smooth cursor movement over multiple steps',
    path: '/library/features/extras#move-smooth',
    group: 'Extras (Rust)',
    keywords: ['smooth', 'move', 'steps', 'interpolate', 'move_smooth'],
  },
  {
    label: 'drag()',
    description: 'Smooth move with button held',
    path: '/library/features/extras#drag',
    group: 'Extras (Rust)',
    keywords: ['drag', 'smooth', 'button', 'hold', 'move'],
  },
  {
    label: 'move_pattern()',
    description: 'Navigate a sequence of relative waypoints',
    path: '/library/features/extras#move-pattern',
    group: 'Extras (Rust)',
    keywords: ['pattern', 'waypoint', 'path', 'sequence', 'move_pattern'],
  },
  {
    label: 'Event Callbacks',
    description: 'on_button_press and on_button_event handlers',
    path: '/library/features/extras#event-callbacks',
    group: 'Extras (Rust)',
    keywords: ['callback', 'event', 'handler', 'on_button_press', 'on_button_event', 'EventHandle'],
  },
  {
    label: 'Catch Convenience',
    description: 'start_catch and stop_catch helpers',
    path: '/library/features/extras#catch-convenience',
    group: 'Extras (Rust)',
    keywords: ['start_catch', 'stop_catch', 'catch', 'convenience', 'lock', 'extras'],
  },
  {
    label: 'Catch Callbacks',
    description: 'on_catch and on_catch_event handlers',
    path: '/library/features/extras#catch-callbacks',
    group: 'Extras (Rust)',
    keywords: ['on_catch', 'on_catch_event', 'catch', 'callback', 'handler', 'EventHandle'],
  },

  // ── Library: Mock Sections ──────────────────────────────────────────

  {
    label: 'Device::mock()',
    description: 'Create a mock device for testing',
    path: '/library/features/mock#mock-device',
    group: 'Mock (Rust)',
    keywords: ['mock', 'create', 'Device::mock', 'test', 'constructor'],
  },
  {
    label: 'on_command()',
    description: 'Register mock responses for specific commands',
    path: '/library/features/mock#mock-responses',
    group: 'Mock (Rust)',
    keywords: ['on_command', 'response', 'register', 'mock', 'stub'],
  },
  {
    label: 'inject_button_event()',
    description: 'Simulate button state changes in mock',
    path: '/library/features/mock#mock-events',
    group: 'Mock (Rust)',
    keywords: ['inject', 'button', 'event', 'simulate', 'mock', 'inject_button_event'],
  },
  {
    label: 'sent_commands() / clear_sent()',
    description: 'Inspect and clear commands sent to the mock',
    path: '/library/features/mock#mock-inspection',
    group: 'Mock (Rust)',
    keywords: ['sent', 'commands', 'inspect', 'verify', 'clear', 'assert', 'sent_commands'],
  },
  {
    label: 'Mock Test Example',
    description: 'Complete unit test pattern with mock device',
    path: '/library/features/mock#mock-test-example',
    group: 'Mock (Rust)',
    keywords: ['test', 'example', 'unit test', 'pattern', '#[test]', 'mock'],
  },

  // ── Library: Profile Sections ───────────────────────────────────────

  {
    label: 'CommandStat',
    description: 'Per-command timing breakdown',
    path: '/library/features/profile#command-stat',
    group: 'Profile (Rust)',
    keywords: ['profiler', 'timing', 'stats', 'CommandStat', 'performance'],
  },
  {
    label: 'timed! Macro',
    description: 'Time arbitrary expressions with zero-cost when disabled',
    path: '/library/features/profile#timed-macro',
    group: 'Profile (Rust)',
    keywords: ['timed', 'macro', 'profile', 'measure', 'benchmark'],
  },

  // ── Library: Types and Errors Sections ──────────────────────────────

  {
    label: 'Core Types',
    description: 'Device, AsyncDevice, DeviceConfig, FireAndForget',
    path: '/library/types#core-types',
    group: 'Types (Rust)',
    keywords: ['Device', 'AsyncDevice', 'DeviceConfig', 'FireAndForget', 'core', 'struct'],
  },
  {
    label: 'Button Enum',
    description: 'Left, Right, Middle, Side1, Side2',
    path: '/library/types#enums',
    group: 'Types (Rust)',
    keywords: ['Button', 'enum', 'Left', 'Right', 'Middle', 'Side1', 'Side2'],
  },
  {
    label: 'LockTarget Enum',
    description: 'X, Y, Left, Right, Middle, Side1, Side2',
    path: '/library/types#enums',
    group: 'Types (Rust)',
    keywords: ['LockTarget', 'enum', 'X', 'Y', 'axis', 'lock'],
  },
  {
    label: 'ConnectionState Enum',
    description: 'Disconnected, Connecting, Connected',
    path: '/library/types#enums',
    group: 'Types (Rust)',
    keywords: ['ConnectionState', 'enum', 'Disconnected', 'Connecting', 'Connected'],
  },
  {
    label: 'ButtonMask (Type)',
    description: 'Button state bitmask with per-button accessors',
    path: '/library/types#data-structs',
    group: 'Types (Rust)',
    keywords: ['ButtonMask', 'bitmask', 'struct', 'left', 'right', 'is_pressed', 'raw'],
  },
  {
    label: 'LockStates',
    description: 'All seven lock states as a struct',
    path: '/library/types#data-structs',
    group: 'Types (Rust)',
    keywords: ['LockStates', 'struct', 'x', 'y', 'left', 'right', 'middle', 'side'],
  },
  {
    label: 'DeviceInfo',
    description: 'Combined port name and firmware version',
    path: '/library/types#data-structs',
    group: 'Types (Rust)',
    keywords: ['DeviceInfo', 'struct', 'port', 'firmware', 'Display'],
  },
  {
    label: 'Feature-Gated Types',
    description: 'BatchBuilder, EventHandle, MockTransport, CommandStat',
    path: '/library/types#feature-types',
    group: 'Types (Rust)',
    keywords: ['BatchBuilder', 'AsyncBatchBuilder', 'EventHandle', 'MockTransport', 'CommandStat', 'feature'],
  },
  {
    label: 'makcu::Result',
    description: 'Type alias for Result<T, MakcuError>',
    path: '/library/types#error-handling',
    group: 'Types (Rust)',
    keywords: ['Result', 'error', 'handling', 'fallible', 'MakcuError'],
  },
  {
    label: 'MakcuError',
    description: 'Error enum variants and handling',
    path: '/library/types#error-variants',
    group: 'Types (Rust)',
    keywords: ['error', 'MakcuError', 'NotConnected', 'Timeout', 'OutOfRange', 'NotFound'],
  },
  {
    label: 'MakcuError::OutOfRange',
    description: 'Parameter outside valid range (value, min, max)',
    path: '/library/types#error-variants',
    group: 'Types (Rust)',
    keywords: ['OutOfRange', 'range', 'value', 'min', 'max', 'parameter', 'validation'],
  },
  {
    label: 'MakcuError::NotConnected',
    description: 'No active device connection',
    path: '/library/types#error-variants',
    group: 'Types (Rust)',
    keywords: ['NotConnected', 'disconnected', 'no connection', 'error'],
  },
  {
    label: 'MakcuError::Timeout',
    description: 'Command response timed out',
    path: '/library/types#error-variants',
    group: 'Types (Rust)',
    keywords: ['Timeout', 'timed out', 'command_timeout', 'response', 'error'],
  },
  {
    label: 'MakcuError::NotFound',
    description: 'No MAKCU device found during auto-detection',
    path: '/library/types#error-variants',
    group: 'Types (Rust)',
    keywords: ['NotFound', 'not found', 'auto-detect', 'scan', 'error'],
  },

  // ── Hardware: Sections ──────────────────────────────────────────────────

  {
    label: 'USB Port Layout',
    description: 'USB 1 (Left), USB 2 (COM), USB 3 (Right) port mapping',
    path: '/native/hardware#hardware-architecture',
    group: 'Hardware',
    keywords: ['usb 1', 'usb 2', 'usb 3', 'left', 'com', 'right', 'port', 'diagram', 'hid'],
  },
  {
    label: 'Hardware Constraints',
    description: 'COM port exclusivity, mouse required on USB 3',
    path: '/native/hardware#constraints',
    group: 'Hardware',
    keywords: ['constraint', 'com port', 'exclusive', 'mouse required', 'usb 3'],
  },
  {
    label: 'LED Indicators',
    description: 'LED blink patterns and their meanings',
    path: '/native/hardware#led-indicators',
    group: 'Hardware',
    keywords: ['led', 'blink', 'flash', 'solid', 'startup', 'indicator'],
  },

  // ── Transport: Sections ─────────────────────────────────────────────────

  {
    label: 'USB VID / PID',
    description: '0x1A86 / 0x55D3 - USB identification',
    path: '/native/transport#serial-transport',
    group: 'Transport',
    keywords: ['0x1A86', '0x55D3', 'vid', 'pid', 'vendor', 'product'],
  },
  {
    label: 'CH340 / CH343',
    description: 'WCH USB serial chip identification',
    path: '/native/transport#serial-transport',
    group: 'Transport',
    keywords: ['ch340', 'ch343', 'wch', 'usb chip', 'serial chip', 'USB-Enhanced-SERIAL'],
  },
  {
    label: '/dev/ttyACM0',
    description: 'Linux device path for MAKCU COM port',
    path: '/native/transport#serial-transport',
    group: 'Transport',
    keywords: ['ttyACM0', 'linux', 'device path', 'dev'],
  },
  {
    label: 'Baud Rate Negotiation',
    description: '115200 default, 4 Mbaud operating speed',
    path: '/native/transport#baud-rate',
    group: 'Transport',
    keywords: ['115200', '4000000', '4 mbaud', 'baud', 'speed', 'negotiate'],
  },

  // ── Connection: Sections ────────────────────────────────────────────────

  {
    label: 'Baud Change Frame',
    description: 'DE AD 05 00 A5 00 09 3D 00 - binary frame to switch baud',
    path: '/native/connection#baud-change-frame',
    group: 'Connection',
    keywords: ['DE AD', 'A5', 'binary frame', 'magic header', 'baud change', '9 bytes'],
  },
  {
    label: 'Connection Handshake',
    description: 'Step-by-step connection establishment procedure',
    path: '/native/connection#connection-sequence',
    group: 'Connection',
    keywords: ['connect', 'handshake', 'sequence', 'steps', 'establish', '500 ms', 'timeout'],
  },

  // ── Protocol: Sections ──────────────────────────────────────────────────

  {
    label: 'Request Format',
    description: 'km.<command>(<args>)\\r\\n - how commands are sent',
    path: '/native/protocol#request-format',
    group: 'Protocol',
    keywords: ['request', 'format', 'command', 'syntax', 'args', 'parenthesis'],
  },
  {
    label: 'Response Types',
    description: 'EXECUTED, RESPONDED, and SILENT response categories',
    path: '/native/protocol#response-format',
    group: 'Protocol',
    keywords: ['response', 'executed', 'responded', 'silent', 'prompt', '>>>'],
  },
  {
    label: 'Reading Responses',
    description: 'Parsing strategy and timeout handling',
    path: '/native/protocol#reading-responses',
    group: 'Protocol',
    keywords: ['parse', 'read', 'timeout', '500 ms', 'delimiter', 'framing'],
  },
  {
    label: '>>> Prompt',
    description: 'Response delimiter sequence (3E 3E 3E 20)',
    path: '/native/protocol#response-format',
    group: 'Protocol',
    keywords: ['prompt', '>>>', '3E', 'delimiter', 'terminator'],
  },

  // ── Working Commands ────────────────────────────────────────────────────

  {
    label: 'km.version()',
    description: 'Returns km.MAKCU firmware identifier',
    path: '/native/commands/version#km-version',
    group: 'Commands',
    keywords: ['version', 'identify', 'firmware', 'km.MAKCU', 'verify'],
  },
  {
    label: 'km.left()',
    description: 'Query or set left button state',
    path: '/native/commands/buttons#query-state',
    group: 'Commands',
    keywords: ['left', 'button', 'query', 'press', 'release', 'click'],
  },
  {
    label: 'km.right()',
    description: 'Query or set right button state',
    path: '/native/commands/buttons#query-state',
    group: 'Commands',
    keywords: ['right', 'button', 'query', 'press', 'release'],
  },
  {
    label: 'km.middle()',
    description: 'Query or set middle button state',
    path: '/native/commands/buttons#query-state',
    group: 'Commands',
    keywords: ['middle', 'button', 'query', 'press', 'release'],
  },
  {
    label: 'km.ms1()',
    description: 'Query or set side button 1 state',
    path: '/native/commands/buttons#query-state',
    group: 'Commands',
    keywords: ['ms1', 'side button', 'side 1', 'thumb', 'query', 'press', 'release'],
  },
  {
    label: 'km.ms2()',
    description: 'Query or set side button 2 state',
    path: '/native/commands/buttons#query-state',
    group: 'Commands',
    keywords: ['ms2', 'side button', 'side 2', 'thumb', 'query', 'press', 'release'],
  },
  {
    label: 'km.move(x, y)',
    description: 'Relative cursor movement',
    path: '/native/commands/movement#km-move',
    group: 'Commands',
    keywords: ['move', 'cursor', 'mouse', 'position', 'relative', 'pixel', 'x', 'y'],
  },
  {
    label: 'km.silent(x, y)',
    description: 'Atomic drag operation (left-down, move, left-up)',
    path: '/native/commands/movement#km-silent',
    group: 'Commands',
    keywords: ['silent', 'drag', 'move', 'left button down', 'atomic', 'hid frame'],
  },
  {
    label: 'km.wheel(n)',
    description: 'Scroll wheel input',
    path: '/native/commands/wheel#km-wheel',
    group: 'Commands',
    keywords: ['scroll', 'wheel', 'up', 'down', 'delta'],
  },
  {
    label: 'km.buttons()',
    description: 'Enable, disable, or query button event stream',
    path: '/native/commands/stream#stream-enable',
    group: 'Commands',
    keywords: ['buttons', 'stream', 'enable', 'disable', 'events', 'query'],
  },
  {
    label: 'km.catch_ml(0)',
    description: 'Enable left button press/release stream while locked',
    path: '/native/commands/catch#catch-commands',
    group: 'Commands',
    keywords: ['catch', 'left', 'capture', 'stream', 'press', 'release', 'lock'],
  },
  {
    label: 'km.catch_mm(0)',
    description: 'Enable middle button press/release stream while locked',
    path: '/native/commands/catch#catch-commands',
    group: 'Commands',
    keywords: ['catch', 'middle', 'capture', 'stream', 'press', 'release', 'lock'],
  },
  {
    label: 'km.catch_mr(0)',
    description: 'Enable right button press/release stream while locked',
    path: '/native/commands/catch#catch-commands',
    group: 'Commands',
    keywords: ['catch', 'right', 'capture', 'stream', 'press', 'release', 'lock'],
  },
  {
    label: 'km.catch_ms1(0)',
    description: 'Enable side button 1 press/release stream while locked',
    path: '/native/commands/catch#catch-commands',
    group: 'Commands',
    keywords: ['catch', 'side', 'ms1', 'capture', 'stream', 'press', 'release', 'lock'],
  },
  {
    label: 'km.catch_ms2(0)',
    description: 'Enable side button 2 press/release stream while locked',
    path: '/native/commands/catch#catch-commands',
    group: 'Commands',
    keywords: ['catch', 'side', 'ms2', 'capture', 'stream', 'press', 'release', 'lock'],
  },
  {
    label: 'km.serial()',
    description: 'Read, set, or reset mouse serial number',
    path: '/native/commands/serial#serial-commands',
    group: 'Commands',
    tags: ['Unverified'],
    keywords: ['serial', 'spoof', 'read', 'set', 'reset'],
  },

  // ── Lock Commands ───────────────────────────────────────────────────────

  {
    label: 'km.lock_mx()',
    description: 'Lock or query horizontal mouse movement',
    path: '/native/commands/locks#lock-reference',
    group: 'Commands',
    keywords: ['lock', 'x', 'horizontal', 'movement', 'axis', 'mx'],
  },
  {
    label: 'km.lock_my()',
    description: 'Lock or query vertical mouse movement',
    path: '/native/commands/locks#lock-reference',
    group: 'Commands',
    keywords: ['lock', 'y', 'vertical', 'movement', 'axis', 'my'],
  },
  {
    label: 'km.lock_ml()',
    description: 'Lock or query left button',
    path: '/native/commands/locks#lock-reference',
    group: 'Commands',
    keywords: ['lock', 'left', 'button', 'ml'],
  },
  {
    label: 'km.lock_mr()',
    description: 'Lock or query right button',
    path: '/native/commands/locks#lock-reference',
    group: 'Commands',
    keywords: ['lock', 'right', 'button', 'mr'],
  },
  {
    label: 'km.lock_mm()',
    description: 'Lock or query middle button',
    path: '/native/commands/locks#lock-reference',
    group: 'Commands',
    keywords: ['lock', 'middle', 'button', 'mm'],
  },
  {
    label: 'km.lock_ms1()',
    description: 'Lock or query side button 1',
    path: '/native/commands/locks#lock-reference',
    group: 'Commands',
    keywords: ['lock', 'side', 'ms1', 'button'],
  },
  {
    label: 'km.lock_ms2()',
    description: 'Lock or query side button 2',
    path: '/native/commands/locks#lock-reference',
    group: 'Commands',
    keywords: ['lock', 'side', 'ms2', 'button'],
  },

  // ── Button Sections ─────────────────────────────────────────────────────

  {
    label: 'Button Query State',
    description: 'Read current button state (0 = released, 1 = pressed)',
    path: '/native/commands/buttons#query-state',
    group: 'Buttons',
    keywords: ['query', 'state', 'read', 'pressed', 'released', '0', '1'],
  },
  {
    label: 'Button Set State',
    description: 'Press (1), soft release (0), force release (2)',
    path: '/native/commands/buttons#set-state',
    group: 'Buttons',
    keywords: ['set', 'press', 'release', 'force release', 'soft release', 'override'],
  },
  {
    label: 'Soft Release vs Force Release',
    description: 'Argument 0 (soft) vs argument 2 (force) behaviour',
    path: '/native/commands/buttons#set-state',
    group: 'Buttons',
    keywords: ['soft release', 'force release', 'physical state', 'override', '0', '2'],
  },
  {
    label: 'Click Sequence',
    description: 'No shorthand - send press then release as two commands',
    path: '/native/commands/buttons#click',
    group: 'Buttons',
    keywords: ['click', 'press', 'release', 'sequence', 'shorthand', 'delay'],
  },

  // ── Lock Sections ───────────────────────────────────────────────────────

  {
    label: 'Set Lock',
    description: 'Enable (1) or disable (0) an input lock',
    path: '/native/commands/locks#set-lock',
    group: 'Locks',
    keywords: ['set', 'enable', 'disable', 'lock', 'block', 'allow'],
  },
  {
    label: 'Query Lock State',
    description: 'Read current lock state (0 or 1)',
    path: '/native/commands/locks#query-lock',
    group: 'Locks',
    keywords: ['query', 'state', 'read', 'locked', 'unlocked', '0-3 range'],
  },
  {
    label: 'Lock Command Reference',
    description: 'All 7 lock targets: mx, my, ml, mr, mm, ms1, ms2',
    path: '/native/commands/locks#lock-reference',
    group: 'Locks',
    keywords: ['reference', 'all', 'targets', 'list', 'mx', 'my', 'ml', 'mr', 'mm', 'ms1', 'ms2'],
  },

  // ── Stream Sections ─────────────────────────────────────────────────────

  {
    label: 'Stream Enable / Disable',
    description: 'km.buttons(1) to enable, km.buttons(0) to disable',
    path: '/native/commands/stream#stream-enable',
    group: 'Stream',
    keywords: ['enable', 'disable', 'start', 'stop', 'km.buttons'],
  },
  {
    label: 'Button Bitmask',
    description: 'Event byte format: bit 0 = left, bit 4 = ms2',
    path: '/native/commands/stream#button-bitmask',
    group: 'Stream',
    keywords: ['bitmask', 'mask', '0x01', '0x02', '0x04', '0x08', '0x10', 'bit', 'byte', 'snapshot'],
  },
  {
    label: 'Stream Event Parsing',
    description: 'Detect events by matching km. prefix (6B 6D 2E)',
    path: '/native/commands/stream#stream-parsing',
    group: 'Stream',
    keywords: ['parse', 'prefix', '6B 6D 2E', 'km.', 'detect', 'match'],
  },
  {
    label: 'Control Character Collisions',
    description: '0x0A and 0x0D mask values collide with \\n and \\r',
    path: '/native/commands/stream#stream-parsing',
    group: 'Stream',
    keywords: ['collision', '0x0A', '0x0D', 'newline', 'carriage return', 'line-based', 'parser', 'dropped'],
  },

  // ── Catch Sections ─────────────────────────────────────────────────────

  {
    label: 'Catch Enable / Disable',
    description: 'Enable with catch_ml(0), disable by unlocking',
    path: '/native/commands/catch#catch-enable',
    group: 'Catch',
    keywords: ['catch', 'enable', 'disable', 'toggle', 'unlock'],
  },
  {
    label: 'Catch Event Format',
    description: 'ASCII press (1) and release (2) events',
    path: '/native/commands/catch#catch-events',
    group: 'Catch',
    keywords: ['catch', 'event', 'format', 'press', 'release', '1', '2', 'ascii'],
  },
  {
    label: 'Catch Usage',
    description: 'Full lock, enable, listen, unlock sequence',
    path: '/native/commands/catch#catch-usage',
    group: 'Catch',
    keywords: ['catch', 'usage', 'lock', 'sequence', 'physical', 'example'],
  },
  {
    label: 'Catch Command Reference',
    description: 'All 5 catch targets: ml, mm, mr, ms1, ms2',
    path: '/native/commands/catch#catch-commands',
    group: 'Catch',
    keywords: ['catch', 'reference', 'all', 'targets', 'ml', 'mm', 'mr', 'ms1', 'ms2'],
  },
  {
    label: 'Catch Notes',
    description: 'Independence from km.buttons(), args behaviour',
    path: '/native/commands/catch#catch-notes',
    group: 'Catch',
    keywords: ['catch', 'notes', 'independent', 'buttons', 'args'],
  },

  // ── Broken Commands: Individual ─────────────────────────────────────────

  {
    label: 'km.move(x, y, steps)',
    description: 'Smooth movement - broken, diagonal moves produce no output',
    path: '/native/broken#broken-commands',
    group: 'Known Issues',
    tags: ['Broken'],
    keywords: ['smooth', 'steps', 'diagonal', 'broken', 'move'],
  },
  {
    label: 'km.move(x, y, steps, cx, cy)',
    description: 'Bezier curve movement - broken',
    path: '/native/broken#broken-commands',
    group: 'Known Issues',
    tags: ['Broken'],
    keywords: ['bezier', 'curve', 'broken', 'move', 'control point'],
  },
  // ── Silent Commands: Individual ─────────────────────────────────────────

  {
    label: 'km.click()',
    description: 'Click shorthand - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['click', 'shorthand', 'silent', 'non-functional'],
  },
  {
    label: 'km.turbo()',
    description: 'Turbo mode - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['turbo', 'rapid', 'auto', 'silent', 'non-functional'],
  },
  {
    label: 'km.screen()',
    description: 'Absolute positioning - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['screen', 'absolute', 'position', 'silent'],
  },
  {
    label: 'km.moveto()',
    description: 'Absolute move - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['moveto', 'absolute', 'position', 'silent'],
  },
  {
    label: 'km.getpos()',
    description: 'Get cursor position - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['getpos', 'position', 'cursor', 'coordinates', 'silent'],
  },
  {
    label: 'km.axis()',
    description: 'Axis streaming - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['axis', 'streaming', 'silent'],
  },
  {
    label: 'km.mo(...)',
    description: 'Raw HID frames - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['mo', 'raw', 'hid', 'frame', 'silent'],
  },
  {
    label: 'km.remap_button()',
    description: 'Button remapping - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['remap', 'button', 'mapping', 'silent'],
  },
  {
    label: 'km.invert_x()',
    description: 'Invert X axis - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['invert', 'x', 'axis', 'reverse', 'silent'],
  },
  {
    label: 'km.swap_xy()',
    description: 'Swap X/Y axes - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['swap', 'x', 'y', 'axes', 'silent'],
  },
  {
    label: 'km.pan()',
    description: 'Horizontal scroll - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['pan', 'horizontal', 'scroll', 'silent'],
  },
  {
    label: 'km.tilt()',
    description: 'Tilt scroll - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['tilt', 'scroll', 'silent'],
  },
  {
    label: 'km.mouse()',
    description: 'Mouse streaming - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['mouse', 'streaming', 'silent'],
  },
  {
    label: 'km.down()',
    description: 'Keyboard key down - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['down', 'keyboard', 'key', 'silent'],
  },
  {
    label: 'km.up()',
    description: 'Keyboard key up - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['up', 'keyboard', 'key', 'silent'],
  },
  {
    label: 'km.press()',
    description: 'Keyboard key press - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['press', 'keyboard', 'key', 'silent'],
  },
  {
    label: 'km.string()',
    description: 'Type string - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['string', 'type', 'keyboard', 'text', 'silent'],
  },
  {
    label: 'km.info()',
    description: 'Device info - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['info', 'device', 'information', 'silent'],
  },
  {
    label: 'km.device()',
    description: 'Device management - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['device', 'management', 'silent'],
  },
  {
    label: 'km.bypass()',
    description: 'Bypass mode - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['bypass', 'silent'],
  },
  {
    label: 'km.led()',
    description: 'LED control - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['led', 'light', 'silent'],
  },
  {
    label: 'km.release()',
    description: 'Release command - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['release', 'silent'],
  },
  {
    label: 'km.fault()',
    description: 'Fault reporting - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['fault', 'error', 'reporting', 'silent'],
  },
  {
    label: 'km.baud()',
    description: 'Baud rate command - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['baud', 'rate', 'speed', 'silent'],
  },
  {
    label: 'km.echo()',
    description: 'Echo command - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['echo', 'test', 'silent'],
  },
  {
    label: 'km.log()',
    description: 'Logging - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['log', 'logging', 'debug', 'silent'],
  },
  {
    label: 'km.lock_mw()',
    description: 'Extended lock (wheel) - not recognised by firmware',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['lock', 'wheel', 'mw', 'extended', 'silent'],
  },
  {
    label: 'km.side1() / km.side2()',
    description: 'Wrong button names - use km.ms1() / km.ms2() instead',
    path: '/native/broken#silent-commands',
    group: 'Known Issues',
    tags: ['Silent'],
    keywords: ['side1', 'side2', 'wrong', 'name', 'ms1', 'ms2', 'silent'],
  },

  // ── Notes: Sections ─────────────────────────────────────────────────────

  {
    label: 'Command Tracking',
    description: 'No command IDs, responses returned in order',
    path: '/native/notes#command-tracking',
    group: 'Notes',
    keywords: ['tracking', 'id', 'order', 'sequence', 'parenthesis'],
  },
  {
    label: 'Lock State Caching',
    description: 'Do not cache lock state - always query the device',
    path: '/native/notes#lock-state-notes',
    group: 'Notes',
    keywords: ['lock', 'state', 'cache', 'query', 'power cycle', 'stale'],
  },
  {
    label: 'Fire-and-Forget vs Confirmed',
    description: 'Wait for >>> prompt before sending the next command',
    path: '/native/notes#fire-and-forget',
    group: 'Notes',
    keywords: ['fire and forget', 'confirmed', 'wait', 'prompt', 'queue', 'misalignment'],
  },
];

export function buildSearchItems(navigate: (path: string) => void): CommandPaletteItem[] {
  return entries.map((entry, i) => ({
    id: `search-${i}`,
    label: entry.label,
    description: entry.description,
    icon: entry.icon,
    group: entry.group,
    tags: entry.tags,
    keywords: entry.keywords,
    onSelect: () => navigate(entry.path),
  }));
}
