import React from 'react';
import Image from 'next/image';

const Team = () => {
  return (
    <div id='team' className='mt-5.5 flex flex-col items-center max-w-7xl mx-auto px-2 py-12 bg-white shadow-2xl rounded-2xl text-center'>
        <div className='flex flex-col items-center text-center mb-8'>
            <h2 className='text-2xl text-black font-extrabold md:text-3xl lg:text-4xl'>Meet Our Team</h2>
            <div className="w-20 h-1 bg-[#00BCD4] rounded-2xl mt-8 mb-6"></div>
        </div>
        <p className='mb-7'>Get to know our multidisciplinary team of certified medical professionals.</p>
        <div className='mb-10'>
            <div className="flex flex-wrap justify-center">

                <div className="m-4 p-6 max-w-sm w-[220px] md:w-[270px] bg-[#f3f3f3]   rounded-[10px] shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-in-out hover:translate-y-[-10px]">
                  <div className="w-32 h-32 relative border-4 border-[#246E71] rounded-full mx-auto">
                    <Image
                        src="/team-member1.jpg"
                        alt="Team Member 1"
                        fill
                        className="rounded-full object-cover"
                    />
                    </div>

                    <h3 className="text-xl font-semibold text-center mt-4">Dr. Fola Aluko</h3>
                    <p className="text-center text-gray-600">General Practictioner</p>
                </div>
                <div className="m-4 p-6 max-w-sm w-[220px] md:w-[270px] bg-[#f3f3f3]   rounded-[10px] shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-in-out hover:translate-y-[-10px]">
                    <div className="w-32 h-32 relative border-4 border-[#246E71] rounded-full mx-auto">
                    <Image
                        src="/team-member2.jpg"
                        alt="Team Member 1"
                        fill
                        className="rounded-full object-cover"
                    />
                    </div>

                    <h3 className="text-xl font-semibold text-center mt-4">Nurse Judith Obi</h3>
                    <p className="text-center text-gray-600">Home Care Nurse </p>
                    <p className="text-center text-gray-600">(Phiebotomy Specialist) </p>

                </div>
                 <div className="m-4 p-6 max-w-sm w-[220px] md:w-[270px] bg-[#f3f3f3]   rounded-[10px] shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-in-out hover:translate-y-[-10px]">
                   <div className="w-32 h-32 relative border-4 border-[#246E71] rounded-full mx-auto">
                    <Image
                        src="/team-member3.jpg"
                        alt="Team Member 1"
                        fill
                        className="rounded-full object-cover"
                    />
                    </div>

                    <h3 className="text-xl font-semibold text-center mt-4">Doctor Osaro Akpede</h3>
                    <p className="text-center text-gray-600">Family Medicine consultant</p>
                </div>
                 <div className="m-4 p-6 max-w-sm w-[220px] md:w-[270px] bg-[#f3f3f3]   rounded-[10px] shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-in-out hover:translate-y-[-10px]">
                   <div className="w-32 h-32 relative border-4 border-[#246E71] rounded-full mx-auto">
                    <Image
                        src="/team-member4.jpg"
                        alt="Team Member 1"
                        fill
                        className="rounded-full object-cover"
                    />
                    </div>

                    <h3 className="text-xl font-semibold text-center mt-4">Nurse Taiwo Ogunleye</h3>
                    <p className="text-center text-gray-600">Occupational Health Nurse</p>
                </div>
            </div>
            
        </div>
            <p className='text-center font-extrabold text-[#246E71]'> Each Team Member is handpicked for excellence, Empathy, and ethics.</p>
    </div>
  )
}

export default Team
