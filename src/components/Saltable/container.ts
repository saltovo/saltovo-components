import { createContainer } from 'unstated-next';
import React, { useState } from 'react';
import { ColumnsType } from 'antd/lib/table';

export interface Columnsvalue<p = unknown> extends ColumnsType<p> {
  title: string;
  dataIndex: string | number;
  width: number;
  defaultchecked: boolean;
  align: 'center' | 'left' | 'right';
  children?: Columnsvalue[];
}

export type ColumnsMap = Map<React.Key, Columnsvalue>;

function useCounter() {
  // 原来columnsSetting使用Map类型现在使用React.Key[],优化后期添加的二级树结构
  const [columnsSetting, setColumnsSetting] = useState<React.Key[]>([]);
  const [sortKeyColumns, setSortKeyColumns] = useState<string[]>([]);
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
