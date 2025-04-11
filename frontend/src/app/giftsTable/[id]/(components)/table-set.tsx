'use client'

import useGetGiftedProducts from "../(hooks)/useGetGiftedProducts"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default function TableSet(){
    const giftedProductsArray = useGetGiftedProducts()
    return(
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={giftedProductsArray}/>
        </div>
    )
}