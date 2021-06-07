import React, { useState, useMemo, useEffect } from 'react';
import { Table } from 'antd';
import ColumnsSettings from './columnssetting';
import Counter, { Columnsvalue } from './container';
import { SaltableProps } from './index';

export default (props: SaltableProps) => {
  // 把Columnsvalue[]转换为ColumnsMap的形式，方便生成columns处理
  const ColumnsTransformMap = new Map();
  props.columns.map((item: Columnsvalue) => {
    if (item.children && item.children.length > 0) {
      item.children.map((ele: Columnsvalue) => {
        ColumnsTransformMap.set(ele.dataIndex, ele);
      });
    }
    ColumnsTransformMap.set(item.dataIndex, item);
  });
  // 是否显示列设置icon
  const [columnssettingshow, setColumnsSettingShow] = useState<boolean>(true);
  const counter = Counter.useContainer();

  useEffect(() => {
    const columnsSettingShow = props.columns.some((ele) => {
      return ele.defaultchecked;
    });
    if (!columnsSettingShow) {
      setColumnsSettingShow(false);
    }
  }, [props.columns]);

  // 判断渲染toolBarRender
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
    // 当ColumnsTransformMap与counter.columnsSetting中均存在item是放入tempArray
    counter.sortKeyColumns.map((item) => {
      if (ColumnsTransformMap.has(item) && counter.columnsSetting.includes(item)) {
        tempArray.push(ColumnsTransformMap.get(item));
      }
    });
    if (!columnssettingshow) {
      tempArray = props.columns;
    }
    return tempArray;
  }, [counter.sortKeyColumns, counter.columnsSetting, columnssettingshow]);

  useEffect(() => {
    if (props.onColumnsStateChange) {
      props.onColumnsStateChange(columns);
    }
  }, [columns]);

  return (
    <div className="ant-card-body">
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
