import {$host} from "@/api/index";

export async function getServices() {
    try {
        const { data } = await $host.get("/services");
        return data;
    } catch (err) {
        console.error("Ошибка при загрузке services:", err);
        return [];
    }
}

export async function getServicesItem(code) {
    try {
        const { data } = await $host.get("/services/"+code);
        return data;
    } catch (err) {
        console.error("Ошибка при загрузке servicesItem:", err);
        return [];
    }
}