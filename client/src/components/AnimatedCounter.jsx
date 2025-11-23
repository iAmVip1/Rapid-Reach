import React from "react";
import BloodBank from "./HeroModels/BloodBank";
import Hospitalbuilding from "./HeroModels/Hospitalbuilding";
import PoliceDepartment from "./HeroModels/PoliceDepartment";

const AnimatedCounter = () => {
  return (
    <div id="counter" className="px-6 md:px-16 py-10 xl:mt-0 mt-32">
      <section className="w-full flex flex-col gap-20">
        {/* SECTION Police department */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 ">
          {/* TEXT */}
          <div className="md:w-[70%] w-full space-y-5 order-1">
            <h2 className="text-3xl font-bold">Police Department</h2>
            <p className="text-gray-600 text-lg">
              Law enforcement units responsible for maintaining public safety,
              preventing crime, and responding to emergency situations.
            </p>

            {/* CUSTOM BUTTON */}
            <button className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors cursor-pointer">
              Visit Service
            </button>
          </div>

          {/* 3D MODEL */}
          <div className="md:w-[30%] w-full order-2 mt-6 md:mt-0">
            <figure>
              <div className="w-full h-[400px] md:h-[500px]">
                <PoliceDepartment />
              </div>
            </figure>
          </div>
        </div>

        {/* SECTION Hospital */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* TEXT */}
          <div className="md:w-[70%] w-full space-y-5 order-1">
            <h2 className="text-3xl font-bold">Hospital Services</h2>
            <p className="text-gray-600 text-lg">
              Healthcare facilities offering diagnosis, treatment, surgeries,
              and emergency care with specialized medical staff and equipment.
            </p>

            {/* CUSTOM BUTTON */}
            <button className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors cursor-pointer">
              Visit Service
            </button>
          </div>

          {/* 3D MODEL */}
          <div className="md:w-[30%] w-full order-2 mt-6 md:mt-0">
            <figure>
              <div className="w-full h-[400px] md:h-[500px]">
                <Hospitalbuilding />
              </div>
            </figure>
          </div>
        </div>
        {/* SECTION Fire Department */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 ">
          {/* TEXT */}
          <div className="md:w-[70%] w-full space-y-5 order-1">
            <h2 className="text-3xl font-bold">Fire Department</h2>
            <p className="text-gray-600 text-lg">
             Emergency service teams dedicated to fire suppression, rescue operations, and disaster response.
            </p>

            {/* CUSTOM BUTTON */}
            <button className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors cursor-pointer">
              Visit Service
            </button>
          </div>

          {/* 3D MODEL */}
          <div className="md:w-[30%] w-full order-2 mt-6 md:mt-0">
            <figure>
              <div className="w-full h-[400px] md:h-[500px]">
                <BloodBank />
              </div>
            </figure>
          </div>
        </div>

        {/* SECTION Blood Bank */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* TEXT */}
          <div className="md:w-[70%] w-full space-y-5 order-1">
            <h2 className="text-3xl font-bold">Blood Bank Services</h2>
            <p className="text-gray-600 text-lg">
              Centers that collect, test, store, and distribute blood and blood components for patients requiring transfusions.
            </p>

            {/* CUSTOM BUTTON */}
            <button className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors cursor-pointer">
              Visit Service
            </button>
          </div>

          {/* 3D MODEL */}
          <div className="md:w-[30%] w-full order-2 mt-6 md:mt-0">
            <figure>
              <div className="w-full h-[400px] md:h-[500px]">
                <Hospitalbuilding />
              </div>
            </figure>
          </div>
        </div>
        {/* SECTION Ambulance */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 ">
          {/* TEXT */}
          <div className="md:w-[70%] w-full space-y-5 order-1">
            <h2 className="text-3xl font-bold">Ambulance Services</h2>
            <p className="text-gray-600 text-lg">
              Quick-response medical vehicles equipped to provide emergency first aid and fast transportation to hospitals during critical situations.
            </p>

            {/* CUSTOM BUTTON */}
            <button className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors cursor-pointer">
              Visit Service
            </button>
          </div>

          {/* 3D MODEL */}
          <div className="md:w-[30%] w-full order-2 mt-6 md:mt-0">
            <figure>
              <div className="w-full h-[400px] md:h-[500px]">
                <BloodBank />
              </div>
            </figure>
          </div>
        </div>

        {/* SECTION Police Vehicle */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* TEXT */}
          <div className="md:w-[70%] w-full space-y-5 order-1">
            <h2 className="text-3xl font-bold">Police Vehicle Services</h2>
            <p className="text-gray-600 text-lg">
              Patrol and emergency response vehicles used by police for rapid movement, monitoring, and on-site assistance.
            </p>

            {/* CUSTOM BUTTON */}
            <button className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors cursor-pointer">
              Visit Service
            </button>
          </div>

          {/* 3D MODEL */}
          <div className="md:w-[30%] w-full order-2 mt-6 md:mt-0">
            <figure>
              <div className="w-full h-[400px] md:h-[500px]">
                <Hospitalbuilding />
              </div>
            </figure>
          </div>
        </div>
        {/* SECTION Fire Truck */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 ">
          {/* TEXT */}
          <div className="md:w-[70%] w-full space-y-5 order-1">
            <h2 className="text-3xl font-bold">Fire Truck Services</h2>
            <p className="text-gray-600 text-lg">
             Specialized firefighting vehicles equipped with ladders, water pumps, hoses, and rescue tools for handling fire emergencies.
              <br />
            </p>

            {/* CUSTOM BUTTON */}
            <button className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors cursor-pointer">
              Visit Service
            </button>
          </div>

          {/* 3D MODEL */}
          <div className="md:w-[30%] w-full order-2 mt-6 md:mt-0">
            <figure>
              <div className="w-full h-[400px] md:h-[500px]">
                <BloodBank />
              </div>
            </figure>
          </div>
        </div>

      </section>
    </div>
  );
};

export default AnimatedCounter;
