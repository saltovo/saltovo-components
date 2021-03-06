import React from 'react';
import Counter, { Columnsvalue } from './container';
import Saltable from './Saltable';
import { TableProps } from 'antd/lib/table';
import { VList } from './vlist';
import 'antd/lib/tree/style/index.css';

export interface SaltableProps extends TableProps<any> {
  toolBarRender?: any;
  onColumnsStateChange?: (ColumnsSelceted: Columnsvalue[]) => void;
  columns: Columnsvalue[];
  useVirtual?: boolean;
}

/**
 * saltable组件，自带可配置列选择
 * @param SaltableProps
 **/

export default (props: SaltableProps) => {
  const saltTableprops = { ...props };
  // 开启虚拟列表
  if (props.useVirtual && props.scroll?.y) {
    saltTableprops.components = VList({ height: props.scroll?.y });
  }
  return (
    <Counter.Provider>
      <Saltable {...saltTableprops} />
    </Counter.Provider>
  );
};
