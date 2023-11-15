/** @format */

import { stateT } from '../../App';

type propT = {
  arrContent: stateT[];
};

export function ShowResult({ arrContent }: propT) {
  return (
    <>
      <div className='result_container'>
        {arrContent.map((e) => {
          return (
            <div key={e.id} className='item_container'>
              <p className='item_notes'>{e.content}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
