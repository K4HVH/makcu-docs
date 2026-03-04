import { createSignal, onCleanup, onMount, Show } from 'solid-js';
import { type RouteSectionProps, useNavigate, useLocation } from '@solidjs/router';
import { GridBackground } from '../../components/surfaces/GridBackground';
import { Pane, type PaneState } from '../../components/navigation/Pane';
import { Tabs } from '../../components/navigation/Tabs';
import { Titlebar } from '../../components/navigation/Titlebar';
import { Button } from '../../components/inputs/Button';
import {
  BsType, BsInputCursor, BsCardText, BsCheckSquare, BsCircle,
  BsList, BsChevronExpand, BsSliders, BsCursor, BsGrid,
  BsArrowRepeat, BsWindowStack, BsBell, BsChat, BsAward, BsTag,
  BsPerson, BsFolder, BsLayoutSidebar, BsFileText, BsTable, BsThreeDots,
  BsChevronBarLeft, BsChevronRight, BsChevronBarExpand, BsHash, BsCalendar,
  BsCloudUpload,
  BsCommand,
  BsDashLg,
  BsWindowSidebar,
  BsHddNetwork,
} from 'solid-icons/bs';

const tabOptions = [
  { value: 'typography', label: 'Typography', icon: BsType },
  { value: 'textfield', label: 'TextField', icon: BsInputCursor },
  { value: 'card', label: 'Card', icon: BsCardText },
  { value: 'checkbox', label: 'Checkbox', icon: BsCheckSquare },
  { value: 'radiogroup', label: 'RadioGroup', icon: BsCircle },
  { value: 'combobox', label: 'Combobox', icon: BsList },
  { value: 'multiselect', label: 'Multi-Select', icon: BsChevronExpand },
  { value: 'slider', label: 'Slider', icon: BsSliders },
  { value: 'button', label: 'Button', icon: BsCursor },
  { value: 'buttongroup', label: 'ButtonGroup', icon: BsGrid },
  { value: 'progress', label: 'Progress', icon: BsArrowRepeat },
  { value: 'dialog', label: 'Dialog', icon: BsWindowStack },
  { value: 'notification', label: 'Notification', icon: BsBell },
  { value: 'tooltip', label: 'Tooltip', icon: BsChat },
  { value: 'badge', label: 'Badge', icon: BsAward },
  { value: 'chip', label: 'Chip', icon: BsTag },
  { value: 'avatar', label: 'Avatar', icon: BsPerson },
  { value: 'tabs', label: 'Tabs', icon: BsFolder },
  { value: 'pane', label: 'Pane', icon: BsLayoutSidebar },
  { value: 'form', label: 'Form', icon: BsFileText },
  { value: 'table', label: 'Table', icon: BsTable },
  { value: 'menu', label: 'Menu', icon: BsThreeDots },
  { value: 'pagination', label: 'Pagination', icon: BsChevronBarLeft },
  { value: 'breadcrumbs', label: 'Breadcrumbs', icon: BsChevronRight },
  { value: 'accordion', label: 'Accordion', icon: BsChevronBarExpand },
  { value: 'numberinput', label: 'NumberInput', icon: BsHash },
  { value: 'datepicker', label: 'DatePicker', icon: BsCalendar },
  { value: 'fileupload', label: 'FileUpload', icon: BsCloudUpload },
  { value: 'commandpalette', label: 'CommandPalette', icon: BsCommand },
  { value: 'divider', label: 'Divider', icon: BsDashLg },
  { value: 'titlebar', label: 'Titlebar', icon: BsWindowSidebar },
  { value: 'server', label: 'Server', icon: BsHddNetwork },
];

const Test = (props: RouteSectionProps) => {
  const [paneState, setPaneState] = createSignal<PaneState>('partial');
  const [isMobile, setIsMobile] = createSignal(false);
  const navigate = useNavigate();
  const location = useLocation();

  onMount(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (e.matches) setPaneState('closed');
      else setPaneState('partial');
    };
    mql.addEventListener('change', handler);
    onCleanup(() => mql.removeEventListener('change', handler));
    if (mql.matches) setPaneState('closed');
  });

  const activeDemo = () => location.pathname.replace(/^\//, '') || 'typography';
  const activeDemoLabel = () => tabOptions.find(t => t.value === activeDemo())?.label;

  return (
    <>
      <GridBackground gridSize={10} />

      <div class="content" style={{ display: "flex", height: "100%", width: "100%" }}>
        <Pane
          position="left"
          mode={isMobile() ? 'temporary' : 'permanent'}
          fixed={isMobile()}
          openSize="200px"
          partialSize="50px"
          state={paneState()}
          onStateChange={setPaneState}
        >
          <Tabs
            scrollable
            orientation="vertical"
            variant="subtle"
            value={activeDemo()}
            onChange={(value: string) => {
              navigate(`/${value}`);
              if (isMobile()) setPaneState('closed');
            }}
            options={tabOptions}
            class={paneState() !== 'open' ? 'tabs--labels-hidden' : ''}
          />
        </Pane>

        <div style={{ flex: 1, overflow: "auto" }}>
          <Titlebar
            title="MidnightUI"
            subtitle={activeDemoLabel()}
            sticky
            style={{ margin: 'var(--g-spacing-sm)', top: 'var(--g-spacing-sm)' }}
            left={
              <Show when={isMobile()}>
                <Button
                  variant="subtle"
                  size="compact"
                  icon={BsList}
                  onClick={() => setPaneState(s => s === 'open' ? 'closed' : 'open')}
                  aria-label="Toggle navigation"
                />
              </Show>
            }
          />
          <div class="container grid">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
