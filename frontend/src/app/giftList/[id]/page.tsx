'use client'

import { useParams } from "next/navigation";
import LoggedHeader from "../../../components/Headers/LoggedHeader";
import checkAuth from "@/functions/checkAuthFunction";
import useLogOut from "@/functions/logOutFunction";

export default function giftsList(){

    const {weddingID} = useParams()

    checkAuth()
    const logOut = useLogOut()

    return (
        <>
        <LoggedHeader
        onClick={logOut}
        />
        </>
    )
}