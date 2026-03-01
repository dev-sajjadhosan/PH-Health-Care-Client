'use client';

import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/app/(commonLayout)/consultation/_action";

export default function DoctorsList() {
    const { data } = useQuery({
        queryKey: ["doctors"],
        queryFn: getDoctors,
    });
    return (
        <div>
            <h1>Doctors List</h1>
        </div>
    );
}