import React, { useEffect, useState } from 'react';
import Test from './Test';

function fetchData() {
  return new Promise((resolve) => {
    resolve({
      name: '张三'
    })
  })
}

const Demo: React.FC = () => {

  const [TestComponent, setTestComponent] = useState<any>({
    component: null
  });
  // console.log('Test => ', Test);
  function loadTestComponent() {
    import('./Test')
      .then(res => {
        console.log('res.default => ', res.default);
        setTestComponent({
          component: res.default
        });
      })
  }

  useEffect(() => {
    async function getData() {
      const res = await fetchData();
      console.log(res);
    }
    getData();
  }, [])
  // console.log('Test => ', Test);
  // console.log('xx', React.createElement(Test))
  console.log('component => ', TestComponent);
  return (
    <div>
      { TestComponent.component ? <TestComponent.component></TestComponent.component> : '' }
      {/* { React.createElement(Test) } */}
      <div>demo</div>
      <button onClick={loadTestComponent}>点我加载test组件</button>
    </div>
  )
}

/**
 * 很诡异的问题，
 */
// class Demo extends React.Component<any, any> {

//   constructor(props: any) {
//     super(props);
//     this.state = {
//       TestComponent: null
//     }
//   }

//   loadTestComponent() {
//     import('./Test')
//       .then(res => {
//         console.log('res.default => ', res.default);
//         // console.log('is xxx', res.default);
//         this.setState({
//           TestComponent: res.default
//         });
//       })
//   }
 
//   render() {

//     const { TestComponent } = this.state;
//     console.log('TestComponent => ', TestComponent);
//     return (
//       <div>
//         { TestComponent ? <TestComponent></TestComponent> : '' }
//         {/* { React.createElement(Test) } */}
//         <div>demo</div>
//         <button onClick={this.loadTestComponent.bind(this)}>点我加载test组件</button>
//       </div>
//     )
//   }
// }

export default Demo;