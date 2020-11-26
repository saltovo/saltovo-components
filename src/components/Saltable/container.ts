import { createContainer } from 'unstated-next';
import { useState, useRef } from 'react';
import { ColumnProps, ColumnsType } from 'antd/lib/table';

export interface Columnsvalue extends ColumnsType<any> {
  title: string;
  dataIndex: string;
  width: number;
  defaultchecked: boolean;
  align: 'center' | 'left' | 'right';
}

export type ColumnsMap = Map<string, Columnsvalue>;

function useCounter() {
  let [columnsSetting, setColumnsSetting] = useState<ColumnsMap>(new Map());
  const setColumnsMap = (map: ColumnsMap) => setColumnsSetting(map);
  return { columnsSetting, setColumnsMap };
}

const Counter = createContainer(useCounter);

export default Counter;
