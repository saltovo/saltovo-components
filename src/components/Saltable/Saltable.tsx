import React, { useState, useMemo, useEffect } from 'react';
import { Table } from 'antd';
import ColumnsSettings from './columnssetting';
import Counter, { Columnsvalue } from './container';
import { SaltableProps } from './index';
import './Saltable.css';

export default (props: SaltableProps) => {
  const [columnssettingshow, setColumnsSettingShow] = useState<boolean>(true);
  const counter = Counter.useContainer();

  useEffect(() => {
    let tempdata: string[] = [];
    props.columns.map((item: Columnsvalue) => {
      if (item.defaultchecked) {
        return tempdata.push(item.dataIndex);
      }
    });
    if (tempdata.length === 0) {
      setColumnsSettingShow(false);
    }
  }, []);

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
    if (!columnssettingshow) {
      tempArray = props.columns;
    }
    return tempArray;
  }, [counter.columnsSetting, columnssettingshow]);

  useEffect(() => {
    if (props.onColumnsStateChange) {
      props.onColumnsStateChange(columns);
    }
  }, [columns]);

  return (
    <div className="ant-card-body" style={{ backgroundColor: 'white' }}>
      <div className="pro-table-list">
        <div className="pro-table-toolBar">
          {toolBarRender.map((item: JSX.Element) => {
            return item;
          })}
        </div>
        {columnssettingshow ? <ColumnsSettings {...props} /> : <div />}
      </div>
      <Table {...props} columns={columns} />
    </div>
  );
};
