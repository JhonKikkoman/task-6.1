/** @format */

export function Refresh() {
  return (
    <>
      <div className='refresh_container'>
        <label htmlFor='ref_btn' className='ref_label'>
          Notes
        </label>
        <button
          className='refresh_btn'
          id='ref_btn'
          onClick={() => console.log('hello')}
        >
          <span className='material-symbols-outlined'>sync</span>
        </button>
      </div>
    </>
  );
}
