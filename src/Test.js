import Postcode from '@actbase/react-daum-postcode';
import React from 'react';

const Test = () => {
  return (
    <>
      <Postcode
        style={{flex: 1}}
        jsOptions={{animation: true}}
        onSelected={data => alert(JSON.stringify(data))}
      />
    </>
  );
};

export default Test;
