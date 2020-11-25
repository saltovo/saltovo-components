import React from 'react';
import Counter from './container';
import Saltable from './Saltable';

export default (props: any) => {
  return (
    <Counter.Provider>
      <Saltable {...props} />
    </Counter.Provider>
  );
};
