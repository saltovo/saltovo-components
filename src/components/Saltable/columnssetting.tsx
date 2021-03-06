import React, { useEffect, useMemo, useState } from 'react';
import { Popover, Checkbox, Tooltip, Col, Tree } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import Counter, { Columnsvalue } from './container';
import { SaltableProps } from './index';

export interface GroupCheckboxListMap {
  localColumns: Columnsvalue[];
}

export default (props: SaltableProps) => {
  //默认为checked的数组
  const definecheckedList: React.Key[] = [];
  const localTreeData: any = [];
  props.columns.map((item: Columnsvalue) => {
    if (item.defaultchecked) {
      definecheckedList.push(item.dataIndex);
    }
    if (item.children && item.children.length > 0) {
      item.children.map((ele: Columnsvalue) => {
        if (ele.defaultchecked) {
          definecheckedList.push(ele.dataIndex);
        }
      });
    }
  });
  props.columns.map((item: Columnsvalue) => {
    if (item.children && item.children.length > 0) {
      let tempdata: any[] = [];
      item.children.map((ele: Columnsvalue) => {
        tempdata.push({ title: ele.title, key: ele.dataIndex, isLeaf: true });
      });
      localTreeData.push({ title: item.title, key: item.dataIndex, children: tempdata });
    } else {
      localTreeData.push({ title: item.title, key: item.dataIndex, isLeaf: true });
    }
  });

  //控制列展示按钮为全选还是半选
  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  //控制是否为全选
  const [checkAll, setCheckAll] = useState<boolean>(false);
  //控制列设置的顺序调换
  //这里总觉得多渲染了一次，暂时先这样。后期再继续优化
  const [treedata, setTreeData] = useState<any>([]);
  //控制列设置树结构的展开
  const [expandedkeys, setExpandKeys] = useState<React.Key[]>([]);
  const counter = Counter.useContainer();

  useEffect(() => {
    counter.setColumnsMap(definecheckedList);
  }, [props.columns]);

  console.log(localTreeData);
  console.log(treedata);

  useEffect(() => {
    setTreeData(localTreeData);
  }, [props.columns]);

  useEffect(() => {
    let sortData: string[] = [];
    treedata.map((item: { key: string; title: React.Key; children: { key: string; title: React.Key }[] }) => {
      if (item.children && item.children.length > 0) {
        return item.children.map((ele) => {
          return sortData.push(ele.key);
        });
      }
      return sortData.push(item.key);
    });
    counter.setSortKeyColumns(sortData);
  }, [treedata]);

  const handleReset = () => {
    setIndeterminate(true);
    setCheckAll(false);
    setTreeData(localTreeData);
    setExpandKeys([]);
    counter.setColumnsMap(definecheckedList);
    //回到最上方
    document.getElementsByClassName('ant-popover-inner-content')[0].scrollTop = 0;
  };

  const onCheckAllChange = (e: any) => {
    let tempMap: React.Key[] = [];
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    if (e.target.checked) {
      props.columns.map((item: Columnsvalue) => {
        tempMap.push(item.dataIndex);
        if (item.children) {
          item.children.map((ele) => {
            tempMap.push(ele.dataIndex);
          });
        }
      });
    }
    counter.setColumnsMap(tempMap);
  };

  //生成列设置列表
  const GroupCheckboxList = ({ localColumns }: any): JSX.Element => {
    return (
      <Tree
        checkable
        draggable
        onExpand={(expandedKeys) => {
          setExpandKeys(expandedKeys);
        }}
        expandedKeys={expandedkeys}
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
          if (Array.isArray(checkedKeys)) {
            setIndeterminate(!!checkedKeys.length && checkedKeys.length < props.columns.length);
            setCheckAll(checkedKeys.length === props.columns.length);
            counter.setColumnsMap(checkedKeys!);
          }
        }}
        checkedKeys={counter.columnsSetting}
        treeData={localColumns}
      />
    );
  };

  return (
    <Popover
      id="zzz"
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
      content={<GroupCheckboxList localColumns={treedata} />}
    >
      <Tooltip title="列设置">
        <SettingOutlined />
      </Tooltip>
    </Popover>
  );
};
