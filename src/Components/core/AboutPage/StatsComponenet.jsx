import React from 'react'
import CountUp from 'react-countup'

const StatsComponenet = () => {
  return (
    <div className='bg-richblack-700 w-screen h-max py-10'>

       <div className='w-9/12 mx-auto flex flex-col gap-9  lg:flex-row items-center flex-wrap lg:justify-between'>
       <div className='flex flex-col justify-between items-center'>
            <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent font-extrabold text-3xl '>
                <CountUp start={0} end={5000} useEasing enableScrollSpy />+
            </h1>
            <p className='text-richblack-500 font-semibold text-lg'>Active Students</p>
        </div>
        <div className='flex flex-col justify-between items-center'>
            <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent font-extrabold text-3xl '>
                <CountUp start={0} end={10} useEasing enableScrollSpy />+
            </h1>
            <p className='text-richblack-500 font-semibold text-lg'>Mentors</p>
        </div>
        <div className='flex flex-col justify-between items-center'>
            <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent font-extrabold text-3xl '>
                <CountUp start={0} end={200} useEasing enableScrollSpy />+
            </h1>
            <p className='text-richblack-500 font-semibold text-lg'>Courses</p>
        </div>
        <div className='flex flex-col justify-between items-center'>
            <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent font-extrabold text-3xl '>
                <CountUp start={0} end={50} useEasing enableScrollSpy />+
            </h1>
            <p className='text-richblack-500 font-semibold text-lg'>Awards</p>
        </div>
       </div>

    </div>
  )
}

export default StatsComponenet