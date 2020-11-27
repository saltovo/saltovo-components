import React from 'react';
import Counter from './container';
import Saltable from './Saltable';
import { TableProps } from 'antd/lib/table';
import { Columnsvalue } from './container';

export interface SaltableProps extends TableProps<any> {
  toolBarRender?: any;
  onColumnsStateChange?: (ColumnsSelceted: Columnsvalue[]) => void;
  columns: Columnsvalue[];
}

export default (props: SaltableProps) => {
  return (
    <Counter.Provider>
      <Saltable {...props} />
    </Counter.Provider>
  );
};
