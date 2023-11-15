/** @format */

import { useEffect, useState } from 'react';
import './App.css';
import { InputNote } from './components/InpuNote/InputNote';
import { Refresh } from './components/Refresh/refresh';
import { ShowResult } from './components/ShowResult/ShowResult';

function App() {
  const [state, setState] = useState('');
  // состояние для Эффекта
  const [response, setResponse] = useState(null);

  console.log(response);
  useEffect(() => {
    // флаг для фетч
    let ignore = false;
    // асинхронный фетч
    const fch = async () => {
      const data = await fetch('http://localhost:7070/notes', {
        method: 'POST',
        body: JSON.stringify({
          id: 0,
          content: state,
        }),
      });
      // ответ от сервера
      const json = await data.json();
      console.log(json);
      // устанавливаем в состояние ответ c проверкой флага
      if (!ignore) {
        setResponse(json);
      }
    };
    fch().catch(console.error);
    // функция Clean-up
    return () => {
      ignore = true;
    };
  }, [state]);

  const funClbk = (str: string) => {
    setState(str);
  };

  return (
    <>
      <div className='main_container'>
        <Refresh />
        <ShowResult />
        <InputNote strClbk={funClbk} />
      </div>
    </>
  );
}

export default App;
