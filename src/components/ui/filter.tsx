import { useSearchParams } from "react-router-dom";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "./dropdown-menu";
import { ArrowDown } from "lucide-react";

interface filterProps {
    filterField: string,
    options: { value: string, label: string }[]
}

/** 
 * Filter component used to render a dropdown menu for selecting a filter option.
 *
 * This component:
 * - Reads the current filter value from the URL's query parameters using the provided `filterField`.
 * - Falls back to the first option's value if no query parameter is set.
 * - Updates the query parameters with the selected filter value when an option is chosen.
 * - Resets the "page" parameter to "1" if it exists, ensuring pagination consistency on filter change.
 *
 * @param props - The properties for the component.
 * @param props.filterField - The key used in the URL's search parameters for filtering.
 * @param props.options - An array of filter options where each option has a `value` and a `label`.
 *
 * @returns A JSX element representing the dropdown filter menu.
 */
function Filter({ filterField, options }: filterProps) {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentFilter = searchParams.get(filterField) || options[0].value;

    // set filter to url
    const handleFilterChange = (value: string) => {
        searchParams.set(filterField, value)
        if (searchParams.get("page")) searchParams.set("page", "1");
        setSearchParams(searchParams)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                    Filter
                    <ArrowDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
                {options.map((option) => (
                    <DropdownMenuCheckboxItem
                        key={option.value}
                        checked={currentFilter === option.value}
                        onCheckedChange={() => handleFilterChange(option.value)}
                    >
                        {option.label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Filter;