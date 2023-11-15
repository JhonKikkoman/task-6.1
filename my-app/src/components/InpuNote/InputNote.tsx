/** @format */

import { useState } from 'react';

type targetT = {
  target: {
    value: string;
  };
};

type propT = {
  strClbk: Function;
};

export function InputNote({ strClbk }: propT) {
  // состояние Input
  const [state, setState] = useState('');

  const handlerSubmit = (e: any) => {
    e.preventDefault();
    strClbk(state);
    setState('');
  };

  const hanlderChange = ({ target }: targetT) => {
    const { value } = target;
    setState(value);
  };

  return (
    <>
      <div className='note_container' onSubmit={handlerSubmit}>
        <form action='' className='form_wrapper'>
          <label htmlFor='note_field' className='hint_label'>
            New note
          </label>
          <textarea
            value={state}
            onChange={hanlderChange}
            id='note_field'
          ></textarea>
          <button type='submit' className='submit_btn'>
            <span className='material-symbols-outlined'>
              line_end_arrow_notch
            </span>
          </button>
        </form>
      </div>
    </>
  );
}
