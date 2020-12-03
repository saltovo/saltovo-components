import React, { useEffect, useMemo, useState } from 'react';
import { Popover, Checkbox, Tooltip, Col } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import Counter, { Columnsvalue } from './container';
import { SaltableProps } from './index';

export type checkedList = string[];
export interface GroupCheckboxListMap {
  localColumns: Columnsvalue[];
}

export default (props: SaltableProps) => {
  const definecheckedList: checkedList = [];
  props.columns.map((item: Columnsvalue) => {
    if (item.defaultchecked) {
      return definecheckedList.push(item.dataIndex);
    }
  });
  const [checkedList, setCheckedList] = useState<checkedList>(definecheckedList);
  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const counter = Counter.useContainer();

  useEffect(() => {
    handleReset();
  }, []);

  const handleReset = () => {
    let tempMap = new Map();
    props.columns.map((item: Columnsvalue) => {
      if (item.defaultchecked) {
        tempMap.set(item.dataIndex, item);
      }
    });
    setCheckedList(definecheckedList);
    setIndeterminate(true);
    setCheckAll(false);
    counter.setColumnsMap(tempMap);
  };

  const onCheckAllChange = (e: any) => {
    let list = props.columns.map((item: Columnsvalue) => {
      return item.dataIndex;
    });
    let tempMap = new Map();
    setCheckedList(e.target.checked ? list : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    if (e.target.checked) {
      props.columns.map((item: Columnsvalue) => {
        tempMap.set(item.dataIndex, item);
      });
    }
    counter.setColumnsMap(tempMap);
  };

  const GroupCheckboxList = ({ localColumns }: GroupCheckboxListMap): JSX.Element => {
    return (
      <Checkbox.Group
        value={checkedList}
        onChange={(checkedValues: any) => {
          setCheckedList(checkedValues);
          setIndeterminate(!!checkedValues.length && checkedValues.length < props.columns.length);
          setCheckAll(checkedValues.length === props.columns.length);
        }}
      >
        {localColumns.map(
          (item: Columnsvalue, index: number): JSX.Element => {
            return (
              <Col key={index} className="column-setting">
                <Checkbox
                  defaultChecked={item.defaultchecked}
                  value={item.dataIndex}
                  onChange={(e) => {
                    let tempMap = new Map(counter.columnsSetting);
                    if (e.target.checked) {
                      tempMap.set(item.dataIndex, item);
                    } else {
                      tempMap.delete(item.dataIndex);
                    }
                    counter.setColumnsMap(tempMap);
                  }}
                >
                  {item.title}
                </Checkbox>
              </Col>
            );
          },
        )}
      </Checkbox.Group>
    );
  };

  return (
    <Popover
      overlayClassName="columnssetting-popover"
      title={
        <div style={{ padding: '4px 16px 4px 0px' }}>
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            列展示
          </Checkbox>
          <a onClick={handleReset}>重置</a>
        </div>
      }
      trigger="click"
      placement="bottomRight"
      content={<GroupCheckboxList localColumns={props.columns} />}
    >
      <Tooltip title="列设置">
        <SettingOutlined />
      </Tooltip>
    </Popover>
  );
};
