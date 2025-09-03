import { SetStateAction } from "react";

type Props = {
  currentPage: number;
  setCurrentPage: (value: SetStateAction<number>) => void;
  filteredLeadsLength: number;
  pageSize: number;
};

const Pagination = ({
  currentPage,
  setCurrentPage,
  filteredLeadsLength,
  pageSize,
}: Props) => {
  const totalPages = Math.ceil(filteredLeadsLength / pageSize);

  return (
    <div className="pagination">
      <button
        className="pagination__button pagination__button--prev"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        &lt;
      </button>

      <span className="pagination__info">
        {currentPage}/{totalPages}
      </span>

      <button
        className="pagination__button pagination__button--next"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
