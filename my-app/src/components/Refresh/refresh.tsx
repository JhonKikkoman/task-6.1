/** @format */

import { useEffect, useState } from 'react';
import { stateT } from '../../App';

type propT = {
  refreshUpdate: (arr: stateT[]) => void;
};

export function Refresh({ refreshUpdate }: propT) {
  const [state, setState] = useState(false);
  useEffect(() => {
    if (state) {
      try {
        (async () => {
          const response = await fetch('http://localhost:7070/notes');
          const result = await response.json();
          refreshUpdate(result);
        })();
      } catch (error) {
        throw new Error(`Ошибка ${error}`);
      }

      setState(false);
    }
  }, [state, refreshUpdate]);

  return (
    <>
      <div className='refresh_container'>
        <label htmlFor='ref_btn' className='ref_label'>
          Notes
        </label>
        <button
          className='refresh_btn'
          id='ref_btn'
          onClick={() => setState(true)}
        >
          <span className='material-symbols-outlined'>sync</span>
        </button>
      </div>
    </>
  );
}
