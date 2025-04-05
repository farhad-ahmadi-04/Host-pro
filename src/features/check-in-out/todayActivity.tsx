import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TodayItem from "./todayItem";
import useTodayActivity from "./useTodayActivity";
import { Skeleton } from "@/components/ui/skeleton";

function TodayActivity() {
    const { activities, isLoading } = useTodayActivity()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Today</CardTitle>
            </CardHeader>
            <CardContent className="md:h-72 overflow-auto">
                {!isLoading
                    ? activities
                        ?
                        <ul className="space-y-10 md:space-y-5 h-full">
                            {activities?.map(activity => <TodayItem activity={activity} key={activity.id} />)}
                        </ul>
                        : <p className="text-center">No activity today...</p>
                    : <Skeleton className="w-full h-14" />
                }
            </CardContent>
        </Card>
    );
}

export default TodayActivity;