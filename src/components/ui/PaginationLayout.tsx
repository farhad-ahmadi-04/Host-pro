import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { PAGE_SIZE } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";

function PaginationLayout({ count }: { count: number }) {
    const [searchParams, setSearchParams] = useSearchParams()
    // get page from url
    const currentPage = !searchParams.get('page')
        ? 1
        : Number(searchParams.get("page"))

    // count of pages
    const pageCount = Math.ceil(count / PAGE_SIZE)

    //  go to previous page
    function perPage() {
        const prev = currentPage === 1 ? currentPage : currentPage - 1

        searchParams.set('page', prev.toString())
        setSearchParams(searchParams)
        console.log(prev);

    }
    // got to next page
    function nextPage() {
        const next = currentPage === pageCount ? currentPage : currentPage + 1

        searchParams.set('page', next.toString())
        setSearchParams(searchParams)
        console.log(next);

    }

    function targetPage(value: number) {
        searchParams.set('page', value.toString())
        setSearchParams(searchParams)
    }

    return (
        <Pagination className="justify-end">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={perPage} disabled={currentPage === 1} />
                </PaginationItem>
                {currentPage !== 1 && <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>}
                {currentPage !== 1 && <PaginationItem>
                    <PaginationLink onClick={() => targetPage(currentPage - 1)}>{currentPage - 1}</PaginationLink>
                </PaginationItem>}
                <PaginationItem>
                    <PaginationLink isActive>{currentPage}</PaginationLink>
                </PaginationItem>
                {currentPage < pageCount && <PaginationItem>
                    <PaginationLink onClick={() => targetPage(currentPage + 1)}>{currentPage + 1}</PaginationLink>
                </PaginationItem>}
                {currentPage !== pageCount && <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>}
                <PaginationItem>
                    <PaginationNext onClick={nextPage} disabled={currentPage === pageCount} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default PaginationLayout;