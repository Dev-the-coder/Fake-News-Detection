import React from 'react'
import loader  from '../../../public/loading-gif.gif'
import Image from 'next/image'
const Loader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <Image src={loader} alt="Loading..." width={50} height={50} />
    </div>
  )
}

export default Loader