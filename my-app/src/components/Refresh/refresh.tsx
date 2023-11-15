/** @format */

import { useEffect, useState } from 'react';

type propT = {
  refreshUpdate: Function;
};

export function Refresh({ refreshUpdate }: propT) {
  const [state, setState] = useState(false);
  useEffect(() => {
    let ignore = false;
    if (state) {
      const fch = async () => {
        const response = await fetch('http://localhost:7070/notes');
        const result = await response.json();
        if (!ignore) {
          refreshUpdate(result);
        }
      };
      fch();
      setState(false);
    }

    return () => {
      ignore = true;
    };
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
