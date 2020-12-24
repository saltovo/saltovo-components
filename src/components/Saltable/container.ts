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

export type ColumnsSettingProps = Array<Columnsvalue>;

function useCounter() {
  let [columnsSetting, setColumnsSetting] = useState<ColumnsSettingProps>([]);
  const setColumnsArray = (array: ColumnsSettingProps) => setColumnsSetting(array);
  return { columnsSetting, setColumnsArray };
}

const Counter = createContainer(useCounter);

export default Counter;
