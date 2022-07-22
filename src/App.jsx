import { useState } from 'react';
import './App.scss';
import style from './App.module.scss';
import a from './test';
import Demo from './component/Demo';
console.log(a);

export default function App() {

  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Demo />
      <div className={style.title} onClick={() => setCount(count + 1)}>count : { count }</div>
    </div>
  )
}