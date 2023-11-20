/** @format */

import { useEffect, useState } from 'react';
import { stateT } from '../../App';

type propT = {
  arrContent: stateT[];
  filterClbk: (args: stateT[]) => void;
};

export function ShowResult({ arrContent, filterClbk }: propT) {
  const [state, setState] = useState(0);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (state !== 0) {
        (async () => {
          await fetch(`http://localhost:7070/notes/${state}`, {
            method: 'DELETE',
          });
        })();
        setState(0);
      }
    }

    return () => {
      ignore = true;
    };
  }, [state]);

  const hanlderClick = (id: number): void => {
    const filterdArr = arrContent.filter((e) => {
      return e.id !== id;
    });
    setState(id);
    filterClbk(filterdArr);
  };
  return (
    <>
      <div className='result_container'>
        {arrContent.map((e) => {
          return (
            <div key={e.id} className='item_container'>
              <button className='close_btn' onClick={() => hanlderClick(e.id)}>
                X
              </button>
              <p className='item_notes'>{e.content}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
