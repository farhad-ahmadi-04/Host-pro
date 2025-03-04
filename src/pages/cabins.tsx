import Section from "@/components/ui/section";
import { columns, Payment } from "@/components/ui/table/columns";
import { DataTable } from "@/components/ui/table/data-table";
import { useEffect, useState } from "react";

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        // ...
    ]
}


function Cabins() {
    const [data, setData] = useState<Payment[]>([])

    useEffect(() => {
        async function fetch() {
            const data = await getData()
            setData(data)
        }
        fetch()
    }, [])


    return (
        <Section>
            <div className="flex justify-between">
                <h1 className="text-lg md:text-2xl lg:text-4xl font-semibold">Cabins</h1>
            </div>
            <div>
                <DataTable columns={columns} data={data} />
            </div>
        </Section >
    );
}

export default Cabins;