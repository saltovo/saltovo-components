import React, { useState, useMemo, useEffect } from 'react';
import { Table } from 'antd';
import ColumnsSettings from './columnssetting';
import Counter, { Columnsvalue, ColumnsMap } from './container';
import { SaltableProps } from './index';

export default (props: SaltableProps) => {
  //把Columnsvalue[]转换为ColumnsMap的形式，方便生成columns处理
  const ColumnsTransformMap = new Map();
  props.columns.map((item: Columnsvalue) => {
    ColumnsTransformMap.set(item.dataIndex, item);
  });
  //是否显示列设置icon
  const [columnssettingshow, setColumnsSettingShow] = useState<boolean>(true);
  const counter = Counter.useContainer();

  useEffect(() => {
    // let sortData: string[] = [];
    // props.columns.map((item: Columnsvalue) => {
    //   return sortData.push(item.dataIndex);
    // });
    // counter.setSortKeyColumns(sortData);
    let columnsSettingShow = props.columns.some((ele) => {
      return ele.defaultchecked;
    });
    if (!columnsSettingShow) {
      setColumnsSettingShow(false);
    }
  }, []);

  //判断渲染toolBarRender
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
    let checkedMap: ColumnsMap = new Map();
    //先把React.Key[]转换为ColumnsMap的形式，再根据sortKeyColumns排序生成真正的columns
    //每次跟新都需要遍历整个props.columns，消耗性能,后期需要优化
    counter.columnsSetting.map((item) => {
      if (ColumnsTransformMap.has(item)) {
        checkedMap.set(item, ColumnsTransformMap.get(item));
      }
    });
    counter.sortKeyColumns.map((item, index) => {
      if (checkedMap.has(item)) {
        tempArray.push(checkedMap.get(item)!);
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
