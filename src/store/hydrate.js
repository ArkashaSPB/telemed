'use client';
import { useEffect } from "react";
import { useServicesStore } from "./services";

export function HydrateServices({ initial }) {
    const setServices = useServicesStore((s) => s.setServices);

    useEffect(() => {
        if (initial?.length) {
            setServices(initial);
        }
    }, [initial, setServices]);

    return null;
}
