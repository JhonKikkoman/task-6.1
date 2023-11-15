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
  console.log(response);

  useEffect(() => {
    let ignore = false;
    const fch = async () => {
      const response = await fetch('http://localhost:7070/notes');
      const result = await response.json();
      if (!ignore) {
        setResponse(result);
      }
    };
    fch();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        await fetch('http://localhost:7070/notes', {
          method: 'POST',
          body: JSON.stringify({
            id: 0,
            content: state,
          }),
        });
      })();
    }

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
        <ShowResult arrContent={response} />
        <InputNote strClbk={funClbk} />
      </div>
    </>
  );
}

export default App;
