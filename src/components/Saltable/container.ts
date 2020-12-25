import { createContainer } from 'unstated-next';
import { useState, useRef } from 'react';
import { ColumnProps, ColumnsType } from 'antd/lib/table';

export interface Columnsvalue<p = unknown> extends ColumnsType<p> {
  title: string;
  dataIndex: string;
  width: number;
  defaultchecked: boolean;
  align: 'center' | 'left' | 'right';
}

export type ColumnsMap = Map<string, Columnsvalue>;

function useCounter() {
  let [columnsSetting, setColumnsSetting] = useState<ColumnsMap>(new Map());
  const sortKeyColumns = useRef<string[]>([]);
  const setColumnsMap = (map: ColumnsMap) => setColumnsSetting(map);
  return {
    sortKeyColumns: sortKeyColumns.current,
    setSortKeyColumns: (keys: string[]) => {
      sortKeyColumns.current = keys;
    },
    columnsSetting,
    setColumnsMap,
  };
}

const Counter = createContainer(useCounter);

export default Counter;
