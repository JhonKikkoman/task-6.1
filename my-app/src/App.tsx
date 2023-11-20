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
  const [state, setState] = useState('');
  const [response, setResponse] = useState<stateT[]>([]);

  useEffect(() => {
    let ignore = false;
    const fch = async () => {
      try {
        const response = await fetch('http://localhost:7070/notes');
        const result = await response.json();
        if (!ignore) {
          setResponse(result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fch();
    if (!ignore) {
      if (state !== '') {
        (async () => {
          await fetch('http://localhost:7070/notes', {
            method: 'POST',
            body: JSON.stringify({
              id: 0,
              content: state,
            }),
          });
        })();
        setState('');
      }
    }

    return () => {
      ignore = true;
    };
  }, [state]);

  const funClbk = (str: string) => {
    setState(str);
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
