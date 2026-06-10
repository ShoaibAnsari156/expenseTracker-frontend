const API_BASE_URL = import.meta.env.VITE_ROOT_URL || "http://localhost:4000";

type ApiOptions = {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
};

export const apiHandler = async <T = any>(
    url: string,
    options: ApiOptions = {}
): Promise<T> => {
    const { method = "GET", body, headers = {} } = options;

    try {
        const res = await fetch(`${API_BASE_URL}${url}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: body && method !== "GET" ? JSON.stringify(body) : undefined,
            credentials: "include",
        });

        let data = await res.json();

        if (!res.ok) {
            throw {
                message: data.message || "Something went wrong",
                status: res.status,
                data,
            };
        }
        // console.log("first response",res);

        return data = { ...data, success: res.ok };
    } catch (error: any) {
        throw {
            message: error.message || "Network error",
            status: error.status || 500,
            data: error.data || null,
        };
    }
};