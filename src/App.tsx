import { useState } from 'react';
import style from './App.module.scss';
import a from './test';
import Demo from './component/Demo';
import img from './images/头像.jpeg';
import xiaozhu from './images/小猪.jpeg';
import We from './images/WechatIMG87.jpeg';
import { Button } from 'antd';
import 'antd/dist/antd.css';
console.log(a);
console.log(We);
const promise = new Promise((resolve) => {});
console.log(promise);

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Demo />
      <Button type="primary" onClick={() => console.log('点我')}>
        点我
      </Button>
      <img src={img} alt="我" />
      <img src={xiaozhu} alt="小猪" />
      <div className={style.title} onClick={() => setCount(count + 1)}>
        count : {count}
      </div>
    </div>
  );
}
