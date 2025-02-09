import Link from 'next/link'

 interface ProdArrayProps {
    _id: string
    description: string
    summDesc: string
    productName: string
    productUrl: string
    tags: string[]
    upVotes: number
  }

interface ListProps {
    productsArray: ProdArrayProps[]
}

export default function Weddings({
    productsArray
}:ListProps) {
  return (
    <ul className="flex flex-col text-center items-center">
      {productsArray.map((product) => (
        <div
          id={product.productName}
          key={product._id}
          className="p-3 sm:p-5 border-gray-400 w-full sm:w-3/5"
        >
          <li
            onClick={() => {}}
            key={product._id}
            className="flex flex-col justify-center cursor-pointer border-solid border-2 shadow-md rounded-lg hover:shadow-lg hover:bg-gray-100"
          >
            <h2 className="font-bold p-2">{product.productName}</h2>
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center sm:ml-5 sm:mr-5 ">
              <p className="text-xs sm:text-sm">About - {product.summDesc}</p>
              <div className="flex flex-row items-center gap-3">
                <Link
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                  href={product.productUrl}
                  target="blank"
                  className=" text-xs  text-orangeText hover:underline sm:text-base"
                >
                  Official Website
                </Link>

                <input type="hidden" name="product" value={product._id} />
                <button
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                  className="px-2 border-solid border-2 border-gray-200 rounded-md"
                  type="button"
                >
                  <img
                    className="h-5 w-5 p-0"
                    src="/upArrow.png"
                    alt="upVote"
                  />
                  <span className="text-orangeText">{product.upVotes}</span>
                </button>
              </div>
            </div>
          </li>
        </div>
      ))}
    </ul>
  )
}
