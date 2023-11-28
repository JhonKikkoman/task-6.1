/** @format */

import { stateT } from '../../App';

type propT = {
  arrContent: stateT[];
  filterClbk: (args: stateT[]) => void;
};

export function ShowResult({ arrContent, filterClbk }: propT) {
  const hanlderClick = (id: number): void => {
    (async () => {
      try {
        await fetch(`http://localhost:7070/notes/${id}`, {
          method: 'DELETE',
        });
        const response = await fetch('http://localhost:7070/notes');
        const result = await response.json();
        filterClbk(result);
      } catch (error) {
        throw new Error(`Ощибка удаления ${error}`);
      }
    })();
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
