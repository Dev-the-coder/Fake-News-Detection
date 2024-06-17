import React from 'react'
import loader  from '../../../public/loading-gif.gif'
import Image from 'next/image'
const Loader = () => {
  return (
    <div className="flex justify-center intem-center">
        <Image src={loader} alt="Loading..." width={100} height={100} />
    </div>
  )
}

export default Loader