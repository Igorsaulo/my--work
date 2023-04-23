import styles from "../../styles/PaginationComponent.module.css";
import Pagination from "react-paginate";

export function PaginationComponent({
  pageCount,
  onPageChange,
  initialPage = 0,
  marginPagesDisplayed,
  pageRangeDisplayed,
}) {
  return (
    <Pagination
      pageCount={pageCount ? pageCount : pageCount === 0 ? 1 : 5}
      marginPagesDisplayed={marginPagesDisplayed ? marginPagesDisplayed : 2}
      pageRangeDisplayed={pageRangeDisplayed ? pageRangeDisplayed : 5}
      onPageChange={onPageChange}
      initialPage={initialPage}
      previousLabel={"Anterior"}
      nextLabel={"Próximo"}
      breakLabel={"..."}
      containerClassName={styles.pagination}
      subContainerClassName={styles.pagination}
      previousClassName={styles.previous}
      previousLinkClassName={styles.previousLink}
      nextClassName={styles.next}
      nextLinkClassName={styles.nextLink}
      pageClassName={styles.count}
      pageLinkClassName={styles.countLink}
      breakClassName={styles.breakMe}
      breakLinkClassName={styles.breakMeLink}
      activeClassName={styles.active}
    />
  );
}
