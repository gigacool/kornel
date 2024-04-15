import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import ReactGridLayout from 'react-grid-layout';
import { Widgets } from '.';
import { ICommunicationBus } from '../../../../../dist/kornel';
import React, { useEffect, useState } from 'react';

import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import './Grid.css';

interface DynamicLayout extends ReactGridLayout.Layout {
  widget?: string,
  style?: Record<string, string | number>,
  colorTheme?: string,
  properties?: Record<string, string | string[] | number>
}

type GridProps = {
  widgets: Widgets,
  bus: ICommunicationBus
}

type WidgetProps = {
  style?: Record<string, string | number>,
  properties?: Record<string, string | string[] | number>,

}

function mergeObjects(obj1: DynamicLayout[], obj2: DynamicLayout[]): DynamicLayout[] {
  const mergedMap = new Map<string, DynamicLayout>();

  obj1.forEach(item => {
    mergedMap.set(item.i, { ...item });
  });

  // Add or update elements from obj2 to the map
  obj2.forEach(item => {
    if (mergedMap.has(item.i)) {
      // If 'i' already exists in the map, merge properties
      const existingItem = mergedMap.get(item.i)!;
      mergedMap.set(item.i, { ...existingItem, ...item });
    } else {
      // If 'i' does not exist in the map, add new item
      mergedMap.set(item.i, { ...item });
    }
  });

  // Convert the map values back to an array of objects
  const mergedObjects = Array.from(mergedMap.values());

  return mergedObjects;
}

export function Grid(props: GridProps) {

  let defaultLayout: DynamicLayout[] = [
    {
      i: "actions",
      x: 0,
      y: 0,
      w: 2,
      h: 3,
      static: true,
      widget: 'todo-dashboard-tile',
      colorTheme: 'blue',
      properties: { // module specific properties (API)
        title: "Daily todo",
        defaultTodos: ['brush my teeth', 'cleanup kitchen', 'do some workout', 'cook diner', 'check a blink']
      }
    },
    { i: "b", x: 2, y: 0, w: 2, h: 1, minW: 2, maxW: 4, widget: 'todo-dashboard-tile', colorTheme: 'pink', properties: { title: "Weekly todo" } },
    { i: "c", x: 2, y: 2, w: 1, h: 1, colorTheme: 'purple', widget: 'count-dashboard-tile' },
    { i: "d", x: 3, y: 2, w: 1, h: 1, colorTheme: 'yellow', widget: 'count-dashboard-tile', properties: { title: 'actions checking', channel: 'TODO' } },
    { i: "e", x: 2, y: 3, w: 1, h: 1, colorTheme: 'peach', widget: 'event-button-dashboard-tile', properties: { title: 'ping action', channel: 'PING' } },
    { i: "f", x: 3, y: 3, w: 1, h: 1, colorTheme: 'green', widget: 'event-button-dashboard-tile', properties: { title: 'pong action', channel: 'PONG' } },
    { i: "g", x: 4, y: 0, w: 2, h: 2, maxW: 8, widget: 'log-tile', colorTheme: '' },
    { i: "h", x: 4, y: 3, w: 2, h: 1, widget: 'count-dashboard-tile', colorTheme: 'peach', properties: { title: 'Ping events', channel: 'PING' } },
  ];

  let savedLayout = localStorage.getItem('grid');
  if (savedLayout) {
    defaultLayout = JSON.parse(savedLayout);
  }

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [layout, setLayout] = useState<DynamicLayout[]>(defaultLayout);

  const handleChange = ((_channel: string, payload: { status: boolean }) => {
    setIsEditing(payload.status);
  })

  useEffect(() => {

    // Subscribe to specific event for prop change
    props.bus.listen('GLOBAL_EDIT_MODE', handleChange);

    return () => { };
  }, []);

  function onLayoutChange(newLayout: DynamicLayout[]): void {
    let merged = mergeObjects(layout, newLayout);
    setLayout(merged);
    localStorage.setItem('grid', JSON.stringify(merged));
  }

  return (
    <ResponsiveReactGridLayout
      className="responsive-grid"
      isDraggable={isEditing}
      isResizable={isEditing}
      onLayoutChange={onLayoutChange}
      breakpoints={{ lg: 1200, md: 960 }}
      cols={{ lg: 6, md: 4 }}
      layouts={{
        lg: layout,
        md: layout
      }}
      width={1200}
      rowHeight={180}
    >
      {layout.map((configuration) => {
        return (<div key={configuration.i} className={configuration.colorTheme} >
          {configuration.widget ?
            React.createElement<WidgetProps>(
              props.widgets[configuration.widget],
              {
                style: configuration.style,
                properties: configuration.properties
              }
            ) : null
          }
        </div>)
      })}
    </ResponsiveReactGridLayout>
  );

}
