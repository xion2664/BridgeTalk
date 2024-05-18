import React from 'react';

export const Input = React.forwardRef((props, ref: any) => {
  return (
    <div className="boardPage__search">
      <form className="boardPage__search-form">
        <input className="boardPage__search-input" type="text" placeholder="검색어를 입력해주세요" ref={ref}></input>
        <button
          className="boardPage__search-button"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <img src={`/assets/img/parent/community/search_solid.svg`} />
        </button>
      </form>
    </div>
  );
});
