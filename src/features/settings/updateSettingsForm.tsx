import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useSettings from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";
import { BookingField } from "@/types/seetings";

function UpdateSettingsForm() {
    const { isError, isLoading, settings } = useSettings()
    const { isSettings, updateSettings } = useUpdateSettings()

    if (isError) return <p className="text-xl">{isError}</p>

    const handleUpdateSettings = (value: string, field: BookingField) => {
        if (!value) return
        const formattedValue = Number(value)
        console.log({ field, formattedValue });

        updateSettings({ field, formattedValue });
    }

    return (
        <form>
            <div className="w-full md:grid grid-cols-4 items-center">
                <Label className="text-nowrap">Minimum nights/booking</Label>
                <div className="w-full col-span-3">
                    <Input
                        type="number"
                        disabled={isLoading || isSettings}
                        defaultValue={settings?.minBookingLength}
                        onBlur={e => handleUpdateSettings(e.target.value, 'minBookingLength')}
                    />
                </div>
            </div>

            <Separator className="my-5" />

            <div className="w-full md:grid md:grid-cols-4 items-center">
                <Label className="text-nowrap w-1/2">Maximum nights/booking</Label>
                <div className="w-full col-span-3">
                    <Input
                        type="number"
                        disabled={isLoading || isSettings}
                        defaultValue={settings?.maxBookingLength}
                        onBlur={e => handleUpdateSettings(e.target.value, 'maxBookingLength')}
                    />
                </div>
            </div>

            <Separator className="my-5" />

            <div className="w-full md:grid md:grid-cols-4 items-center">
                <Label className="text-nowrap w-1/2">Maximum guests/booking</Label>
                <div className="w-full col-span-3">
                    <Input
                        type="number"
                        disabled={isLoading || isSettings}
                        defaultValue={settings?.maxGuestPerBooking}
                        onBlur={e => handleUpdateSettings(e.target.value, 'maxGuestPerBooking')}
                    />
                </div>
            </div>

            <Separator className="my-5" />

            <div className="w-full md:grid md:grid-cols-4 items-center">
                <Label className="text-nowrap w-1/2">Breakfast price</Label>
                <div className="w-full col-span-3">
                    <Input
                        type="number"
                        disabled={isLoading || isSettings}
                        defaultValue={settings?.breakfastPrice}
                        onBlur={e => handleUpdateSettings(e.target.value, 'breakfastPrice')}
                    />
                </div>
            </div>
        </form>
    )
}

export default UpdateSettingsForm;