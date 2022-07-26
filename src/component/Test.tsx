import React, { useEffect, useState } from 'react';
import Demo02 from './Demo02';

export default function Test() {
  const [component, setComponent] = useState<React.ReactElement>();
  useEffect(() => {
    async function demo() {
      const res = await import(/* webpackChunkName: "TestGroup1" */ './Test02');
      setComponent(res.default);
    }
    demo();
  }, []);

  return (
    <div>
      <Demo02></Demo02>
      test
      {component}
    </div>
  );
}
