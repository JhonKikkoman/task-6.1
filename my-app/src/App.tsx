/** @format */

import { useEffect, useState } from 'react';
import './App.css';
import { InputNote } from './components/InpuNote/InputNote';
import { Refresh } from './components/Refresh/refresh';
import { ShowResult } from './components/ShowResult/ShowResult';

export type stateT = {
  id: number;
  content: string;
};

function App() {
  const [response, setResponse] = useState<stateT[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:7070/notes');
        const result = await response.json();
        setResponse(result);
      } catch (error) {
        throw new Error(`Ошибка ${error}`);
      }
    })();
  }, []);

  const funClbk = (str: string) => {
    (async () => {
      try {
        await fetch('http://localhost:7070/notes', {
          method: 'POST',
          body: JSON.stringify({
            id: 0,
            content: str,
          }),
        });
        const response = await fetch('http://localhost:7070/notes');
        const result = await response.json();
        setResponse(result);
      } catch (error) {
        throw new Error(`Ошибка отправки POST - ${error}`);
      }
    })();
  };

  const filterClbkNew = (arr: stateT[]) => {
    setResponse(arr);
  };

  const refreshClbk = (arr: stateT[]) => {
    setResponse(arr);
  };

  return (
    <>
      <div className='main_container'>
        <Refresh refreshUpdate={refreshClbk} />
        <ShowResult arrContent={response} filterClbk={filterClbkNew} />
        <InputNote strClbk={funClbk} />
      </div>
    </>
  );
}

export default App;
