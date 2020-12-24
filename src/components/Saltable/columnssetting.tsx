import React, { useEffect, useMemo, useState } from 'react';
import { Popover, Checkbox, Tooltip, Col } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import Counter, { Columnsvalue, ColumnsSettingProps } from './container';
import { SaltableProps } from './index';

export type checkedList = string[];
export interface GroupCheckboxListMap {
  localColumns: Columnsvalue[];
}

export default (props: SaltableProps) => {
  //默认为checked的数组
  const definecheckedList: checkedList = [];
  props.columns.map((item: Columnsvalue) => {
    if (item.defaultchecked) {
      return definecheckedList.push(item.dataIndex);
    }
  });
  //控制checkbox的选中情况
  const [checkedList, setCheckedList] = useState<checkedList>(definecheckedList);
  //控制列展示按钮为全选还是半选
  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  //控制是否为全选
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const counter = Counter.useContainer();

  useEffect(() => {
    handleReset();
  }, []);

  const handleReset = () => {
    let tempArray: ColumnsSettingProps = [];
    props.columns.map((item: Columnsvalue) => {
      if (item.defaultchecked) {
        tempArray.push(item);
      }
    });
    setCheckedList(definecheckedList);
    setIndeterminate(true);
    setCheckAll(false);
    counter.setColumnsArray(tempArray);
  };

  const onCheckAllChange = (e: any) => {
    let list = props.columns.map((item: Columnsvalue) => {
      return item.dataIndex;
    });
    setCheckedList(e.target.checked ? list : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    if (e.target.checked) {
      counter.setColumnsArray(props.columns);
    }
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
                    let tempArray = [...counter.columnsSetting];
                    if (e.target.checked) {
                      tempArray.push(item);
                    } else {
                      const temp = tempArray.filter((ele) => {
                        console.log(ele.dataIndex, item.dataIndex);
                        return ele.dataIndex !== item.dataIndex;
                      });
                      tempArray = temp;
                      console.log(temp);
                    }
                    counter.setColumnsArray(tempArray);
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
