import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex items-center content-center justify-center gap-2 w-full h-screen flex-col'>
      <Link href='/admin/upload/jee'>
        <div className="border w-[23em] rounded-md bg-black hover:bg-gray-900 transition-all text-white p-2 px-4">
            <span>Upload JEE</span>
        </div>
      </Link>
      <Link href='/admin/upload/neet'>
        <div className="border w-[23em] rounded-md bg-black hover:bg-gray-900 transition-all text-white p-2 px-4">
            <span>Upload NEET</span>
        </div>
      </Link>
      <Link href='/admin/view/jee'>
        <div className="border w-[23em] rounded-md bg-black hover:bg-gray-900 transition-all text-white p-2 px-4">
            <span>View Jee</span>
        </div>
      </Link>
      <Link href='/admin/view/neet'>
        <div className="border w-[23em] rounded-md bg-black hover:bg-gray-900 transition-all text-white p-2 px-4">
            <span>View NEET</span>
        </div>
      </Link>
    </div>
  )
}

export default page
