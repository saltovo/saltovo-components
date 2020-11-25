import React from 'react';
import { LoginOutlined } from '@ant-design/icons';
import { Popover } from 'antd';

export default (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: '30px',
        flex: '1',
      }}
    >
      <p
        style={{
          margin: '0',
          fontSize: '15px',
          whiteSpace: 'nowrap',
          color: 'white',
        }}
      >
        {props.UserName || ''}
      </p>
      <Popover placement="bottom" title={false} content="退出">
        <LoginOutlined className={'loginout'} style={{ marginLeft: '30px' }} onClick={props.loginout} />
      </Popover>
    </div>
  );
};
