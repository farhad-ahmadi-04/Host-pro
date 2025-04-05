import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
    const navigate = useNavigate()

    return (
        <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="w-full space-y-6 text-center">
                <div className="space-y-3">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">404</h1>
                    <p className="text-gray-500">Looks like you've ventured into the unknown digital realm.</p>
                </div>
                <Button
                    onClick={() => navigate(-1)}
                >
                    Return to website
                </Button>
            </div>
        </div>);
}

export default PageNotFound;