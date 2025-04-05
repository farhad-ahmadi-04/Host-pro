import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table/table";

function LoadingCabins({ headNum, rowNum }: { headNum: number, rowNum: number }) {
    return (
        <div>
            {/* title + filters */}
            <div className="flex justify-between items-center py-4">
                {/* add filter on cabin name */}
                <Skeleton
                    className="w-1/4 h-7"
                />

                <div className="flex gap-1">
                    {/* filter */}

                    <Skeleton
                        className="w-7 h-7"
                    />

                    {/* adding column visibility */}
                    <Skeleton
                        className="w-7 h-7"
                    />

                </div>
            </div>

            <Table className="w-full border">
                <TableCaption>Loading...</TableCaption>
                <TableHeader>
                    <TableRow>
                        {Array.from({ length: headNum }, (_, index) =>
                            <TableHead key={index}>
                                <Skeleton className="h-7" />
                            </TableHead>)}

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: rowNum }, (_, index) =>
                        <TableRow key={index}>
                            {Array.from({ length: headNum }, (_, index) =>
                                <TableCell key={index}>
                                    <Skeleton className="h-7" />
                                </TableCell>)}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>

    );
}

export default LoadingCabins;