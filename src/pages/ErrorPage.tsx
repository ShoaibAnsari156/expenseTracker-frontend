// ErrorPage.jsx
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error:any = useRouteError();

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-red-500">
                Something went wrong
            </h1>

            <p className="mt-2 text-gray-600">
                {error?.statusText || error?.message}
            </p>
        </div>
    );
}