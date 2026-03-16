import type { Component } from 'solid-js';
import type { CommandPaletteItem } from '../components/navigation/CommandPalette';
import {
  BsInfoCircle, BsCpu, BsPlug, BsLink45deg, BsTerminal,
  BsCheckCircle, BsCursor, BsArrowsMove, BsMouse, BsLock,
  BsBroadcast, BsUpcScan, BsExclamationTriangle, BsJournalText,
  BsBook,
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
    description: 'MAKCU Rust library documentation (coming soon)',
    path: '/library',
    group: 'Rust Library',
    icon: BsBook,
    keywords: ['rust', 'library', 'crate'],
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
  {
    label: 'km.catch_ml()',
    description: 'Click counter - broken, always returns 0',
    path: '/native/broken#broken-commands',
    group: 'Known Issues',
    tags: ['Broken'],
    keywords: ['catch', 'counter', 'click count', 'broken', 'increment'],
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
