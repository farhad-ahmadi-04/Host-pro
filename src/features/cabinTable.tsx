import { columns } from "@/components/ui/table/columns";
import { DataTable } from "@/components/ui/table/data-table";
import useCabins from "./useCabins";
import LoadingCabins from "./loadingCabins";

function CabinTable() {
    const { cabins, error, isLoading } = useCabins()
    if (error) return <p>{error.message}</p>
    if (isLoading) return <LoadingCabins headNum={5} rowNum={10} />

    return (
        <DataTable columns={columns} data={cabins ?? []} />
    );
}

export default CabinTable;