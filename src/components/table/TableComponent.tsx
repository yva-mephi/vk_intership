import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { Table, CircularProgress } from "@mui/material";
import { rootStore } from "../../store/rootStore.ts";
import TableHeadComponent from "./TableHeadComponent.tsx";
import TableBodyComponent from "./TableBodyComponent.tsx";

const TableComponent = observer(() => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    rootStore.tableStore.fetchNextPage();
  }, []);

  useEffect(() => {
    const el = bottomRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !rootStore.tableStore.isLoading) {
          rootStore.tableStore.fetchNextPage();
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <>
      <Table>
        <TableHeadComponent />
        <TableBodyComponent />
      </Table>

      {rootStore.tableStore.isLoading && <CircularProgress />}
      <div ref={bottomRef} style={{ height: "20px" }} />
    </>
  );
});

export default TableComponent;
