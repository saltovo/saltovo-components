import React, { useEffect, useMemo, useState } from 'react';
import { Popover, Checkbox, Tooltip, Col, Tree } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import Counter, { Columnsvalue } from './container';
import { SaltableProps } from './index';

export type checkedList = string[];
export interface GroupCheckboxListMap {
  localColumns: Columnsvalue[];
}
export default (props: SaltableProps) => {
  //默认为checked的数组
  const definecheckedList: checkedList = [];
  const treeData: any = [];
  const ColumnsTransformMap = new Map();
  props.columns.map((item: Columnsvalue) => {
    if (item.defaultchecked) {
      definecheckedList.push(item.dataIndex);
    }
    treeData.push({ title: item.title, key: item.dataIndex });
    ColumnsTransformMap.set(item.dataIndex, item);
  });

  //控制列展示按钮为全选还是半选
  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  //控制是否为全选
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [checkedKeys, setCheckedKeys] = useState<any>(definecheckedList);
  const [treedata, setTreeData] = useState<any>(treeData);
  const counter = Counter.useContainer();

  useEffect(() => {
    handleReset();
  }, []);

  useEffect(() => {
    let sortData: string[] = [];
    treedata.map((item: { key: string }) => {
      return sortData.push(item.key);
    });
    counter.setSortKeyColumns(sortData);
  }, [treedata]);

  const handleReset = () => {
    let tempMap = new Map();
    props.columns.map((item: Columnsvalue) => {
      if (item.defaultchecked) {
        tempMap.set(item.dataIndex, item);
      }
    });
    setCheckedKeys(definecheckedList);
    setIndeterminate(true);
    setCheckAll(false);
    setTreeData(treeData);
    counter.setColumnsMap(tempMap);
  };

  const onCheckAllChange = (e: any) => {
    let list = props.columns.map((item: Columnsvalue) => {
      return item.dataIndex;
    });
    let tempMap = new Map();
    setCheckedKeys(e.target.checked ? list : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    if (e.target.checked) {
      props.columns.map((item: Columnsvalue) => {
        tempMap.set(item.dataIndex, item);
      });
    }
    counter.setColumnsMap(tempMap);
  };

  const GroupCheckboxList = ({ localColumns }: any): JSX.Element => {
    return (
      <Tree
        checkable
        draggable
        defaultCheckedKeys={definecheckedList}
        onDrop={({ event, node, dragNode, dragNodesKeys }) => {
          //node.pos与dragNode.pos为树结构的值，如不理解可输出
          let nodePos = node.pos.split('-');
          let dragNodePos = dragNode.pos.split('-');
          let tempData = [...treedata];
          //只有当node与dragNode位于树结构的同一级时才可拖动
          if (nodePos.length === dragNodePos.length) {
            if (nodePos.length === 2) {
              tempData[Number(nodePos[1])] = dragNode;
              tempData[Number(dragNodePos[1])] = node;
            }
            //当二级的parent相同时才可拖动
            else if (nodePos.length === 3 && nodePos[1] == dragNodePos[1]) {
              tempData[Number(nodePos[1])].children[Number(nodePos[2])] = dragNode;
              tempData[Number(dragNodePos[1])].children[Number(dragNodePos[2])] = node;
            } else {
              return null;
            }
            setTreeData(tempData);
          } else {
            return null;
          }
        }}
        onCheck={(checkedKeys, e) => {
          let tempMap = new Map();
          if (Array.isArray(checkedKeys)) {
            setIndeterminate(!!checkedKeys.length && checkedKeys.length < props.columns.length);
            setCheckAll(checkedKeys.length === props.columns.length);
            checkedKeys.map((item) => {
              tempMap.set(item, ColumnsTransformMap.get(item));
            });
          }
          counter.setColumnsMap(tempMap);
          setCheckedKeys(checkedKeys);
        }}
        checkedKeys={checkedKeys}
        treeData={treedata}
      />
    );
  };

  return (
    <Popover
      overlayClassName="columnssetting-popover"
      title={
        <div style={{ padding: '4px 16px 4px 22px' }}>
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            列展示
          </Checkbox>
          <a onClick={handleReset}>重置</a>
        </div>
      }
      trigger="click"
      placement="bottomRight"
      content={<GroupCheckboxList localColumns={treeData} />}
    >
      <Tooltip title="列设置">
        <SettingOutlined />
      </Tooltip>
    </Popover>
  );
};
