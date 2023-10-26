import React from 'react'

function SearchProducts(item) {
  return (
    <div className='flex items-center gap-4'>
      <img className="w-24" src={item.image} alt="productImage" />
      <div>
        <p className="text-xs -mb-1">
          {item.category}
        </p>
        <p className="text-lg font-medium">{item.title}</p>
        <p className="text-xs">{item.description.substring(0, 100)}</p>
        <p className="text-sm flex items-center gap-1">
          price:{" "}
          <span className="font-semibold">
            amount={item.price}
          </span>
        </p>
      </div>

    </div>
  )
}

export default SearchProducts
