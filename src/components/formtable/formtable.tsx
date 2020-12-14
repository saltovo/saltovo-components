import React, { useEffect } from 'react';
import { Table, Button, Card, ConfigProvider } from 'antd';
import { useDynamicList } from 'ahooks';
import { ColumnsType } from 'antd/lib/table/index';
import { TableProps as RcTableProps } from 'rc-table/lib/Table';

type ColumnsFunction<T> = (getKey: (index: number) => number) => ColumnsType<T>;

interface FormTableProps<T> {
  colunmns: ColumnsFunction<T>;
  data: RcTableProps<T>['data'];
  cardtitle: string;
  title: string;
}

export default (props: FormTableProps<any>) => {
  const { list, remove, getKey, push, resetList } = useDynamicList(props.data || []);

  useEffect(() => {
    resetList(props.data);
  }, [props.data]);

  const columns: ColumnsType = [
    ...props.colunmns(getKey),
    {
      key: 'memo',
      title: '操作',
      dataIndex: 'memo',
      align: 'center',
      render: (index: number) => (
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
    <Card title={props.cardtitle ? props.cardtitle : props.title} style={{ marginBottom: '20px' }} hoverable={true}>
      <ConfigProvider
        renderEmpty={() => {
          return `暂无${props.cardtitle.split('（')[0]}`;
        }}
      >
        <Table
          columns={columns}
          dataSource={list}
          rowKey={(r, index: any) => getKey(index).toString()}
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
