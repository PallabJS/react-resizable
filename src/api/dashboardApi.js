import { HOST } from "../config";

const dashboardEndpoint = `${HOST}/dashboard`;

export const dashboardApi = {
    getData: async () => {
        try {
            let res = await fetch(`${dashboardEndpoint}/getdata`, {
                method: "get",
            });
            if (res.ok) return await res.json();
        } catch (e) {
            return { error: true, msg: e.message };
        }
    },

    add: async (body) => {
        try {
            let res = await fetch(`${dashboardEndpoint}/add`, {
                method: "post",
                body: JSON.stringify(body),
                headers: {
                    "content-type": "application/json",
                },
            });
            if (res.ok) return await res.json();
        } catch (e) {
            return { error: true, msg: e.message };
        }
    },
    update: async (body) => {
        try {
            let res = await fetch(`${dashboardEndpoint}/update`, {
                method: "post",
                body: JSON.stringify(body),
                headers: {
                    "content-type": "application/json",
                },
            });
            if (res.ok) return await res.json();
        } catch (e) {
            return { error: true, msg: e.message };
        }
    },
};
