function Shimmer() {
  return (
    <div className='w-full'>
        <div className='w-full text-white flex flex-col justify-center gap-5 items-center h-[350px] bg-slate-900'>
            <div className='relative flex items-start'>
                <img className='w-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa" alt="" />
                <span className="loader"></span>
            </div>
            <h1 className='text-2xl'>Looking for great food near you ...</h1>
        </div>
        <div className='w-[90%] mx-auto pt-3 flex flex-wrap justify-center gap-5'>
            {Array(16).fill("").map((data,i) =>
                <div key={i} className="min-w-[295px] h-[182px] relative bg-gray-200 animate-pulse rounded-md"></div>)}
        </div>
    </div>
  )
}

export default Shimmer