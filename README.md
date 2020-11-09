# saltovo-compents

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/saltovo-compents.svg)](https://www.npmjs.com/package/saltovo-compents) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save saltovo-compents
```

## Usage

```jsx
import React, { Component } from 'react'

import {FormTable} from 'saltovo-compents'

class Example extends Component {
  render() {
    return  <FormTable
            title={'社会兼职'}
            colunmns={SocialPosition}
            cardtitle="社会兼职（学会、协会、兼职教授）"
            data={formData.SocialpositionList}
            title="近三年社会兼职"
          />
  }
}
```

## License

MIT © [](https://github.com/)
