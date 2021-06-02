import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

interface IPagination {
  pageSize: number;
  totalCount: number;
  currentPage: number;
  skip: number;
  base: string;
}

const PaginationStyles = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  text-align: center;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
  }

  [aria-disabled="true"] {
    pointer-events: none;
    color: var(--grey);
  }
`;

export const Pagination = ({
  pageSize,
  totalCount,
  currentPage,
  base,
}: IPagination) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  return (
    <PaginationStyles>
      <Link aria-disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        ← Prev
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          key={i}
          className={currentPage === 1 && i === 0 ? "current" : ""}
          to={`${base}/${i > 0 ? i + 1 : ""}`}
        >
          {i + 1}
        </Link>
      ))}
      <Link aria-disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next →
      </Link>
    </PaginationStyles>
  );
};
