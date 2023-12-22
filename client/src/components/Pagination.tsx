import React from 'react';

interface PaginationProps {
  pageChange: (pageChangeValue: number) => void;
  page: number;
  totalpages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalpages,
  pageChange,
}) => {
  return (
    <div className='flex justify-center items-center my-3'>
      <button
        onClick={() => pageChange(-1)}
        className='bg-secondary text-white text-sm p-2 mx-2 rounded-xl'>
        {`<`}
      </button>
      <ul className='flex justify-center items-center gap-2'>
        <li
          className='bg-secondary text-center text-white w-8 h-8 p-1 rounded-full cursor-pointer opacity-90 hover:opacity-100'
          onClick={() => pageChange(page - 1)}>
          {page - 1}
        </li>
        <li
          className='bg-secondary text-center text-white w-8 h-8 p-1 rounded-full cursor-pointer '
          onClick={() => pageChange(page)}>
          {page}
        </li>
        <li
          className='bg-secondary text-center text-white w-8 h-8 p-1 rounded-full cursor-pointer opacity-90 hover:opacity-100'
          onClick={() => pageChange(page + 1)}>
          {page < totalpages ? page + 1 : totalpages}
        </li>
        <li
          className='bg-secondary text-center text-white w-8 h-8 p-1 rounded-full cursor-pointer opacity-90 hover:opacity-100'
          onClick={() => pageChange(totalpages)}>
          {page === totalpages ? '' : totalpages}
        </li>
      </ul>
      <button
        onClick={() => pageChange(1)}
        className='bg-secondary text-white text-sm p-2 mx-2 rounded-xl'>
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
