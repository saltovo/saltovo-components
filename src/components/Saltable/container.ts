import { createContainer } from 'unstated-next';
import { useState, useRef } from 'react';
import { ColumnProps, ColumnsType } from 'antd/lib/table';

export interface Columnsvalue<p = unknown> extends ColumnsType<p> {
  title: string;
  dataIndex: string | number;
  width: number;
  defaultchecked: boolean;
  align: 'center' | 'left' | 'right';
}

export type ColumnsMap = Map<React.Key, Columnsvalue>;

function useCounter() {
  //原来columnsSetting使用Map类型现在使用React.Key[],优化后期添加的二级树结构
  let [columnsSetting, setColumnsSetting] = useState<React.Key[]>([]);
  let [sortKeyColumns, setSortKeyColumns] = useState<string[]>([]);
  const setColumnsMap = (map: React.Key[]) => setColumnsSetting(map);
  return {
    sortKeyColumns,
    setSortKeyColumns,
    columnsSetting,
    setColumnsMap,
  };
}

const Counter = createContainer(useCounter);

export default Counter;
