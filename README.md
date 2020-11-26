# saltovo-compents

> sedt react 组件库 Made by saltovo

[![NPM](https://img.shields.io/npm/v/saltovo-compents.svg)](https://www.npmjs.com/package/saltovo-compents) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save saltovo-compents or yarn add  saltovo-compents
```

## Formtable

> 专家库系列组件专用 table 和 input 的结合

```jsx
import React, { Component } from 'react';

import { FormTable } from 'saltovo-compents';

class Example extends Component {
  render() {
    return (
      <FormTable
        title={'社会兼职'}
        colunmns={SocialPosition}
        cardtitle="社会兼职（学会、协会、兼职教授）"
        data={formData.SocialpositionList}
        title="近三年社会兼职"
      />
    );
  }
}
```

## layoutmixrightcontent

> antd-pro 退出使用提示，

```jsx
import { layoutmixrightcontent } from 'saltovo-compents';
export default () => {
  let UserName = 'saltovo';
  let loginout = () => {
    //退出登录的操作
  };
  return <LayoutMixRightContent loginout={loginout} UserName={UserName} />;
};
```

## Saltable

> 在 antd table 的基础上增加了列设置与 toolBarRender，支持 antd table 的所有参数

```jsx
import { layoutmixrightcontent } from 'saltovo-compents';
export default () => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'Name',
      width: 80,
      align: 'center',
      defaultchecked: true,
    },
    {
      title: '职级',
      dataIndex: 'Rank',
      align: 'center',
      width: 100,
    },
  ];

  return (
    <ProTable
      /*
        toolBarRender支持function,array
        columns设置默认展示的列 defaultchecked: true,
        */
      toolBarRender={selectedTag}
      columns={columns}
    />
  );
};
```

## License

MIT © [](https://github.com/)
