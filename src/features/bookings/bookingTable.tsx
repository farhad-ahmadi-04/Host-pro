import { DataTable } from "@/components/ui/table/data-table";
import { useBookings } from "./useBookings";
import { bookingsColumns } from "@/features/bookings/bookingsColumns";
import LoadingBookings from "./loadingBookings";

function BookingTable() {
    const { bookings, isLoading, error, count } = useBookings()
    if (error) return <p>{error.message}</p>
    if (isLoading) return <LoadingBookings headNum={6} rowNum={5} />

    return (
        <DataTable
            count={count ?? 0}
            columns={bookingsColumns}
            data={bookings ?? []}
            columnName="email" />
    );
}

export default BookingTable;