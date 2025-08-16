import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
import Hospital from "../../../for uploading/hospital.jpg";
import FireDep from "../../../for uploading/firedep.jpg";
import PoliceDep from "../../../for uploading/policedep.jpg";
import Firevec from '../../../for uploading/firevech.jpg'
import PoliceVec from '../../../for uploading//policevec.jpg'
import Ambulance from '../../../for uploading//ambulance.jpg'
import Bloodbank from '../../../for uploading//bloodbank.jpg'

export default function Services() {
  return (
    <div className="p-5">
      <div className="text-center mb-8">
        <p className="md:text-5xl sm:text-4xl text-xl font-bold">Find Here</p>
        <ReactTyped
          className='md:text-5xl sm:text-4xl text-xl font-bold'
          strings={['Fire Department', 'Fire Truck', 'Police Department', 'Hospital', 'Police Vechicle ', 'Ambulance', 'Blood Bank']}
          typeSpeed={120}
          backSpeed={140}
          loop
        />
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        <div className="flex flex-wrap justify-center gap-6">
          {/* FireDep */}
          <Link to={'/gridview?category=fire+department'}>
            <div className="bg-white shadow-md hover:shadow-lg cursor-pointer
              transition-all transform overflow-hidden rounded-lg w-full sm:w-[330px]">
              <img src={FireDep} alt="FireDep"
                className='h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300' />
              <div className="p-3 flex flex-col gap-2 w-full text-center">
                <p className='text-sm font-semibold'>
                  Fire Department
                </p>
              </div>
            </div>
          </Link>

          {/* PoliceDep */}
          <Link to={'/gridview?category=Police+Department'}>
            <div className="bg-white shadow-md hover:shadow-lg cursor-pointer
              transition-all transform overflow-hidden rounded-lg w-full sm:w-[330px]">
              <img src={PoliceDep} alt="PoliceDep"
                className='h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300' />
              <div className="p-3 flex flex-col gap-2 w-full text-center">
                <p className='text-sm font-semibold'>
                  Police Department
                </p>
              </div>
            </div>
          </Link>

          {/* Hospital */}
          <Link to={'/gridview?category=hospital'}>
            <div className="bg-white shadow-md hover:shadow-lg cursor-pointer
              transition-all transform overflow-hidden rounded-lg w-full sm:w-[330px]">
              <img src={Hospital} alt="Hospital"
                className='h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300' />
              <div className="p-3 flex flex-col gap-2 w-full text-center">
                <p className='text-sm font-semibold'>
                  Hospital
                </p>
              </div>
            </div>
          </Link>

          {/* Firevec */}
          <Link to={'/gridview?category=Fire+vehicle'}>
            <div className="bg-white shadow-md hover:shadow-lg cursor-pointer
              transition-all transform overflow-hidden rounded-lg w-full sm:w-[330px]">
              <img src={Firevec} alt="Firevec"
                className='h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300' />
              <div className="p-3 flex flex-col gap-2 w-full text-center">
                <p className='text-sm font-semibold'>
                  Fire Truck
                </p>
              </div>
            </div>
          </Link>

          {/* PoliceVec */}
          <Link to={'/gridview?category=PoliceVec'}>
            <div className="bg-white shadow-md hover:shadow-lg cursor-pointer
              transition-all transform overflow-hidden rounded-lg w-full sm:w-[330px]">
              <img src={PoliceVec} alt="Police Vehicle"
                className='h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300' />
              <div className="p-3 flex flex-col gap-2 w-full text-center">
                <p className='text-sm font-semibold'>
                  Police Vehicle
                  </p>
              </div>
            </div>
          </Link>

          {/* Ambulance */}
          <Link to={'/gridview?category=Ambulance'}>
            <div className="bg-white shadow-md hover:shadow-lg cursor-pointer
              transition-all transform overflow-hidden rounded-lg w-full sm:w-[330px]">
              <img src={Ambulance} alt="Ambulance"
                className='h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300' />
              <div className="p-3 flex flex-col gap-2 w-full text-center">
                <p className='text-sm font-semibold'>
                  Ambulance 
                </p>
              </div>
            </div>
          </Link>

          {/* Bloodbank */}
          <Link to={'/gridview?category=Blood+Bank'}>
            <div className="bg-white shadow-md hover:shadow-lg cursor-pointer
              transition-all transform overflow-hidden rounded-lg w-full sm:w-[330px]">
              <img src={Bloodbank} alt="BloodBAnk"
                className='h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300' />
              <div className="p-3 flex flex-col gap-2 w-full text-center">
                <p className='text-sm font-semibold'>
                  Blood Bank
                </p>
              </div>
            </div>
          </Link>
          
        </div>
      </div>
    </div>
  )
}
