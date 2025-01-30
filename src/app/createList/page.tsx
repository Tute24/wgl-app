'use client'

import GiftListForm from '@/components/Forms/NewList'
import LoggedHeader from '@/components/Headers/LoggedHeader'
import { useContextWrap } from '@/contextAPI/context'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

export default function newList() {
  const {
    setCurrentIndex,
    currentIndex,
    statusMessage,
    setStatusMessage,
  } = useContextWrap()

  const [listData,setListData] = useState({
    
        listTitle: '',
        weddingDate: '',
        gifts: 
          [{
            productName: '',
            productLink: '',
            quantity: 0
          } ]
      
  })

//   useEffect(() => {
//     function newProductSet() {
//       return (
//         <>
//           <div className="p-2">
//             <label htmlFor={`productName-${currentIndex}`}>Product Name</label>
//             <input
//               className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl 
//                 text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
//               type="string"
//               id={`productName-${currentIndex}`}
//               name="productName"
//               value={listData.gifts[currentIndex].productName}
//               placeholder="This product will appear as a gift on your gift list"
//               onChange={(event) => listGiftInputHandler(event, currentIndex)}
//               required
//             />
//           </div>
//           <div className="p-2">
//             <label htmlFor={`productLink-${currentIndex}`}>Product Link</label>
//             <input
//               className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
//               id={`productLink-${currentIndex}`}
//               name="productLink"
//               type="string"
//               value={listData.gifts[currentIndex].productLink}
//               onChange={(event) => listGiftInputHandler(event, currentIndex)}
//               placeholder="Insert the link for your guests to buy the product, if needed."
//             />
//           </div>
//           <div className="p-2">
//             <label htmlFor={`quantity-${currentIndex}`}>Quantity</label>
//             <input
//               className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
//               id={`quantity-${currentIndex}`}
//               name="quantity"
//               type="number"
//               value={listData.gifts[currentIndex].quantity}
//               onChange={(event) => listGiftInputHandler(event, currentIndex)}
//               required
//             />
//           </div>
//         </>
//       )
//     }
//     newProductSet()
//   }, [currentIndex, listData])

  function listInputHandler(event: ChangeEvent<HTMLInputElement>) {
    setListData({
      ...listData,
      [event.target.name]: event.target.value,
    })
  }

    function listGiftInputHandler(
      event: ChangeEvent<HTMLInputElement>,
      index: number
    ) {
      setListData((prevState) => ({
        ...prevState,
        gifts: prevState.gifts.map((gift, i) =>
          i === index
            ? { ...gift, [event.target.name]: event.target.value }
            : gift
        ),
      }))
    }

//   function listGiftInputHandler(
//     event: ChangeEvent<HTMLInputElement>,
//     index: number
//   ) {
//     setListData({
//       ...listData,
//       gifts: listData.gifts.map((gift, i) =>
//         i === index
//           ? { ...gift, [event.target.name]: event.target.value }
//           : gift
//       ),
//     })
//   }

  function listSubmitHandler(event: FormEvent) {
    event.preventDefault()

    console.log(listData)
  }

  return (
    <>
      <LoggedHeader />
      <GiftListForm
        listDataType={listData}
        onChange={listInputHandler}
        onSubmit={listSubmitHandler}
        giftsChange={listGiftInputHandler}
        setListData={setListData}
      />
    </>
  )
}
