function MenuShimmer() {
  return (
    <div className='w-full lg:w-[50%] mx-auto mt-10'>
        <div className='w-full h-40 sm:h-80 rounded-xl bg-gray-200 animate-pulse'></div>
        <div className='w-full flex mt-10 justify-between'>
            <div className='w-[45%] h-15 rounded-xl bg-gray-200 animate-pulse'></div>
            <div className='w-[45%] h-15 rounded-xl bg-gray-200 animate-pulse'></div>
        </div>
        <div className='w-full mt-10 flex flex-col gap-8'>
            {Array(5).fill("").map((data,i) =>(
                <div key={i} className='w-full h-40 mt-6 flex justify-between'>
                    <div className='w-[60%] flex flex-col gap-5 h-full'>
                        <div className='w-[100%] h-8 bg-gray-200 animate-pulse'></div>
                        <div className='w-[50%] h-8 bg-gray-200 animate-pulse'></div>
                        <div className='w-[30%] h-8 bg-gray-200 animate-pulse'></div>
                    </div>
                    <div className='w-[30%] h-full rounded-xl bg-gray-200'></div>
                </div>
            ))}


        </div>
    </div>
  )
}

export default MenuShimmer