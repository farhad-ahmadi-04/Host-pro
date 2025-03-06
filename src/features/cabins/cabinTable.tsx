import { cabinColumns } from "@/features/cabins/cabinColumns";
import { DataTable } from "@/components/ui/table/data-table";
import useCabins from "@/features/cabins/useCabins";
import LoadingCabins from "@/features/cabins/loadingCabins";

function CabinTable() {
    const { cabins, error, isLoading } = useCabins()
    if (error) return <p>{error.message}</p>
    if (isLoading) return <LoadingCabins headNum={5} rowNum={10} />

    return (
        <DataTable columns={cabinColumns} data={cabins ?? []} columnName="name" />
    );
}
export default CabinTable;