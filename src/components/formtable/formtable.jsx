import React, { useEffect } from 'react';
import { Table, Button, Card, ConfigProvider } from 'antd';
import { useDynamicList } from 'ahooks';

export default (props) => {
  const {
    list,
    remove,
    getKey,
    move,
    push,
    sortForm,
    resetList,
  } = useDynamicList(props.data || []);

  useEffect(() => {
    resetList(props.data);
  }, [props.data]);

  const columns = [
    ...props.colunmns(getKey),
    {
      key: 'memo',
      title: '操作',
      dataIndex: 'memo',
      align: 'center',
      render: (text, row, index) => (
        <Button
          danger
          onClick={() => {
            remove(index);
          }}
        >
          删除
        </Button>
      ),
    },
  ];

  return (
    <Card
      title={props.cardtitle ? props.cardtitle : props.title}
      style={{ marginBottom: '20px' }}
      hoverable={true}
    >
      <ConfigProvider
        renderEmpty={() => {
          return `暂无${props.cardtitle.split('（')[0]}`;
        }}
      >
        <Table
          columns={columns}
          dataSource={list}
          rowKey={(r, index) => getKey(index).toString()}
          pagination={false}
        />
      </ConfigProvider>
      <Button
        style={{
          marginTop: 8,
        }}
        block
        type="dashed"
        onClick={() => {
          push({});
        }}
      >
        {`添加${props.title}`}
      </Button>
    </Card>
  );
};
