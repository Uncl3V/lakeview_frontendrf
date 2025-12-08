import React from 'react'

const About = () => {
  return (
    <div id='about'  className="mt-5 bg-white max-w-7xl rounded-2xl shadow-2xl container mx-auto p-10">
        <div  className=" flex flex-col items-center text-center mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-950 mb-4">About Us</h2>
        <div className="w-20 h-1 bg-[#00BCD4] rounded-2xl mb-6"></div>
        </div>

        <h3 className='text-center text-xl text-black font-bold mb-5 md:mb-10'> Who are we</h3>
        <div className='text-center'>
            <p>Lakeview Health Services Limited is a registered healthcare company delivering hybrid medical services, combining virtual telehealth consultations with in-person care tailored to corporate organizations, schools, remote job sites, and individuals. With a foundation in family medicine, accident & emergency and occupational health, Lakeview seeks to fill the urgent need for reliable, on-demand, and cost-effective healthcare access across urban and remote locations.
              <br />
              <br />
            Our services include teleconsultations, workplace health screenings, emergency response training, pre-employment medicals, and wellness initiatives. We aim to be the leading provider of flexible, client-focused corporate health solutions in Nigeria.
            </p>
            <p className='text-black mt-5 md:mt-14'> <span className='text-black font-extrabold'>Vision Statement: </span> To become the most trusted provider of on-demand corporate and community healthcare services in Nigeria and beyond.</p>
            <p className='text-black mt-5 md:mt-14'><span className='font-extrabold'>Mission Statement:</span> To deliver professional, responsive, and reliable medical services that improve the health and productivity of the workforce and communities.</p>

        
        </div>
      
    </div>
  )
}

export default About
