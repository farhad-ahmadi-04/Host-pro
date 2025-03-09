import { DataTable } from "@/components/ui/table/data-table";
import LoadingCabins from "../cabins/loadingCabins";
import { useBookings } from "./useBookings";
import { bookingsColumns } from "@/features/bookings/bookingsColumns";

function BookingTable() {
    const { bookings, isLoading, error, count } = useBookings()
    if (error) return <p>{error.message}</p>
    if (isLoading) return <LoadingCabins headNum={5} rowNum={10} />

    return (
        <DataTable
            count={count ?? 0}
            columns={bookingsColumns}
            data={bookings ?? []}
            columnName="email" />
    );
}

export default BookingTable;