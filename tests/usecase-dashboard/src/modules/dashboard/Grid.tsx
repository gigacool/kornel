import GridLayout from 'react-grid-layout';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import './Grid.css';
import ReactGridLayout from 'react-grid-layout';
import { Widgets } from '.';
import { BusInterface } from '../../../../../dist/kornel';
import React from 'react';

interface DynamicLayout extends ReactGridLayout.Layout{
  widget?:string
}

type GridProps = {
  widgets: Widgets,
  bus:BusInterface
}



export function Grid(props:GridProps){

    const layout: DynamicLayout[] = [
        { i: "actions", x: 0, y: 0, w: 2, h: 3, static: true, widget:'todo-dashboard-tile' },
        { i: "b", x: 2, y: 0, w: 2, h: 1, minW: 2, maxW: 4,widget:'todo-dashboard-tile' },
        { i: "c", x: 2, y: 2, w: 1, h: 1 },
        { i: "d", x: 3, y: 2, w: 1, h: 1 },
        { i: "e", x: 2, y: 3, w: 1, h: 1 },
        { i: "f", x: 3, y: 3, w: 1, h: 1 },
        { i: "g", x: 4, y: 0, w: 2, h: 2, maxW:8, widget:'log-tile' },
        { i: "h", x: 4, y: 3, w: 2, h: 1 },
      ];
    
      
      return (
        <ResponsiveReactGridLayout
          className="responsive-grid"
          isDraggable={false}
          isResizable={false}
          breakpoints= {{ lg: 1200, md: 960 }}
          cols= {{ lg: 6, md: 4 }}
          layouts={{
            lg:layout,
            md:layout
          }}
          // cols={6}
          width={1200}
          // autoSize={true} 
          // margin={[20,20]} // CSS ?
          rowHeight={180}
        >         
        {layout.map((configuration)=>{
            return (<div key={configuration.i}>
              {configuration.widget ? 
                React.createElement(props.widgets[configuration.widget], {})
                : null
              }
            </div>)

        }
            
            )}
        </ResponsiveReactGridLayout>
      );

}
