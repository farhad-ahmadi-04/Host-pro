import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table/table";

function LoadingCabins({ headNum, rowNum }: { headNum: number, rowNum: number }) {
    return (
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

    );
}

export default LoadingCabins;