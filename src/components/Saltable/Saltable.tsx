import React, { useEffect, useMemo } from 'react';
import { Table, Button, Checkbox, Drawer, Col } from 'antd';
import ColumnsSettings from './columnssetting';
import Counter, { Columnsvalue } from './container';
import { SaltableProps } from './index';
import './Saltable.css';

export default (props: SaltableProps) => {
  const counter = Counter.useContainer();

  const toolBarRender = useMemo(() => {
    let toolBarRender = [];
    switch (typeof props.toolBarRender) {
      case 'function':
        toolBarRender = props.toolBarRender();
        break;
      case 'object':
        if (Object.prototype.toString.call(props.toolBarRender) === '[object Array]') {
          toolBarRender = props.toolBarRender;
        } else {
          toolBarRender = [];
        }
        break;
      default:
        toolBarRender = [];
    }
    return toolBarRender;
  }, [props.toolBarRender]);

  const columns = useMemo(() => {
    let tempArray: Columnsvalue[] = [];
    counter.columnsSetting.forEach((value, key) => {
      tempArray.push(value);
    });
    return tempArray;
  }, [counter.columnsSetting]);

  return (
    <div className="ant-card-body" style={{ backgroundColor: 'white' }}>
      <div className="pro-table-list">
        <div className="pro-table-toolBar">
          {toolBarRender.map((item: JSX.Element) => {
            return item;
          })}
        </div>
        <ColumnsSettings {...props} />
      </div>
      <Table {...props} columns={columns} />
    </div>
  );
};
