import React from "react";

const MenuRooms = () => {
  //------------------------------------------
  //--------------- VARIABLES ----------------
  //------------------------------------------

  //------------------------------------------
  //----------------- HOOKS ------------------
  //------------------------------------------

  //------------------------------------------
  //--------------- FUNCTIONS ----------------
  //------------------------------------------

  async function seeProgres() {
    const Swal = require('sweetalert2')
    Swal.fire({
      title: 'Project progress',
      html: '<div className="mb-1 text-base font-medium text-blue-700 dark:text-blue-500">Design</div>' +
        '<div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700"><div className="bg-blue-600 h-2.5 rounded-full" style="width: 45%"></div></div>' +
        '<div className="mb-1 text-base font-medium text-red-700 dark:text-red-500">Devlopment</div>' +
        '<div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700"><div className="bg-red-600 h-2.5 rounded-full" style="width: 75%"></div></div>' +
        '<div className="mb-1 text-base font-medium text-green-700 dark:text-green-500">Ideas</div>' +
        '<div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700"><div className="bg-green-600 h-2.5 rounded-full" style="width: 25%"></div></div>' +
        '<div className="mb-1 text-base font-medium text-violet-700 dark:text-violet-500">Testing</div>' +
        '<div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700"><div className="bg-violet-600 h-2.5 rounded-full" style="width: 45%"></div></div>' +
        '<div className="mb-1 text-base font-medium text-orange-700 dark:text-orange-500">Mrketing</div>' +
        '<div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700"><div className="bg-orange-600 h-2.5 rounded-full" style="width: 85%"></div></div>' +
        '<div className="radial-progress" style="--value:70; --size:12rem; --thickness: 2rem;">70%</div>'
    })
  }

  function ideasRoom() {
    document.getElementById('roomname').innerHTML = "Ideas";
  }
  function designRoom() {
    document.getElementById('roomname').innerHTML = "Design";
  }
  function devRoom() {
    document.getElementById('roomname').innerHTML = "Devlopment";
  }
  function testRoom() {
    document.getElementById('roomname').innerHTML = "Testing";
  }
  function marketingRoom() {
    document.getElementById('roomname').innerHTML = "Marketing";
  }
  //------------------------------------------
  //--------------- COMPONENT ----------------
  //------------------------------------------
  return (
    <>
      <div className="intro-y text-xl font-medium text-back dark:text-white">Rooms</div>
      <div className="mt-5">
        <input className="bg-white shadow-lg dark:bg-boxes pl-5 text-back dark:text-white w-full h-10 rounded-md"
          type="text" name="" id="" placeholder='Search for chat' />
      </div>
      <hr className="mt-4 border-gray-300 dark:border-boxes" />
      <div className="cursor-pointer shadow-lg bg-white dark:bg-boxes w-full h-16 rounded-md hover:scale-105 hover:shadow-xl transition-all flex flex-row items-center justify-between pl-6 pr-4" onClick={designRoom}>
        <div id='roomDesign' className="text-back dark:text-white font-monserrat font-extralight text-lg">GENERAL</div>
        <div className="flex -space-x-2 overflow-hidden justify-end">
          <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/4.webp" alt="" />
          <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/3.webp" alt="" />
          <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/2.webp" alt="" />
          <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/1.webp" alt="" />
        </div>
      </div>
      <hr className="mt-4 border-gray-300 dark:border-boxes" />
      <div className="mt-4 space-y-3">
        <div className=" cursor-pointer shadow-lg bg-white dark:bg-boxes w-full h-16 rounded-md hover:scale-105 hover:shadow-xl  transition-all flex flex-row items-center justify-between pl-6 pr-4" onClick={ideasRoom}>
          <div className="text-back dark:text-white font-monserrat font-extralight text-lg">IDEAS</div>
          <div className="flex -space-x-2 overflow-hidden justify-end">
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/8.webp" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/7.webp" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/6.webp" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/5.webp" alt="" />

          </div>
        </div>


        <div className="cursor-pointer shadow-lg bg-white dark:bg-boxes w-full h-16 rounded-md hover:scale-105 hover:shadow-xl transition-all flex flex-row items-center justify-between pl-6 pr-4" onClick={designRoom}>
          <div id='roomDesign' className="text-back dark:text-white font-monserrat font-extralight text-lg">DESIGN</div>
          <div className="flex -space-x-2 overflow-hidden justify-end">
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/4.webp" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/3.webp" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/2.webp" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/1.webp" alt="" />
          </div>
        </div>
        <div className="cursor-pointer shadow-lg bg-white dark:bg-boxes w-full h-16 rounded-md hover:scale-105 hover:shadow-xl transition-all flex flex-row items-center justify-between pl-6 pr-4" onClick={devRoom}>
          <div className="text-back dark:text-white font-monserrat font-extralight text-lg">DEVLOPMENT</div>
          <div className="flex -space-x-2 overflow-hidden justify-end">
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/10.webp" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/9.webp" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/11.webp" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/12.webp" alt="" />
          </div>
        </div>
        <div className="cursor-pointer shadow-lg bg-white dark:bg-boxes w-full h-16 rounded-md hover:scale-105 hover:shadow-xl transition-all flex flex-row items-center justify-between pl-6 pr-4" onClick={testRoom}>
          <div className="text-back dark:text-white font-monserrat font-extralight text-lg">TESTING</div>
          <div className="flex -space-x-2 overflow-hidden justify-end">
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/13.webp" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/14.webp" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/15.webp" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/16.webp" alt="" />
          </div>
        </div>
        <div className="cursor-pointer shadow-lg bg-white dark:bg-boxes w-full h-16 rounded-md hover:scale-105 hover:shadow-xl transition-all flex flex-row items-center justify-between pl-6 pr-4" onClick={marketingRoom}>
          <div className="text-back dark:text-white font-monserrat font-extralight text-lg">MARKETING</div>
          <div className="flex -space-x-2 overflow-hidden justify-end">
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/17.webp" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/18.webp" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/19.webp" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxes" src="https://tecdn.b-cdn.net/img/new/avatars/20.webp" alt="" />
          </div>
        </div>

      </div>

      <div className="text-gray-400 font-monserrat text-xl font-semibold  mt-4">
        <div className="flex flex-row items-center ">
          <p>Project progress - 26%</p>
          <div className="cursor-pointer hover:text-back dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all bg-white dark:bg-bars ml-7 rounded-md pl-2 pr-2 text-gray-400 font-extralight pt-1 pb-1" onClick={seeProgres}>See progress </div>
        </div>

      </div>

      <hr className="mt-4 border-gray-300 dark:border-boxes" />
      <div className="intro-y text-xl mt-4 font-medium text-back dark:text-white">Recent messages</div>
      <div className="w-full h-screen mt-5 flex gap-2 scrollbar-default">
        <div className="shadow-lg bg-white dark:bg-boxes w-24 h-24 rounded-md hover:scale-105 hover:shadow-xl transition-all flex-shrink-0 flex flex-row justify-center items-center relative">
          <img className="ring-2 ring-gray-300 dark:ring-gray-600  border-4 border-transparent rounded-full w-16" src="https://tecdn.b-cdn.net/img/new/avatars/10.webp" />
          <div className="absolute top-4 left-16 rounded-full bg-green-500 w-4 h-4 border-2 border-white dark:border-boxes"></div>
        </div>
        <div className="shadow-lg bg-white dark:bg-boxes w-24 h-24 rounded-md hover:scale-105 hover:shadow-xl transition-all flex-shrink-0 flex flex-row justify-center items-center relative">
          <img className="ring-2 ring-gray-300 dark:ring-gray-600  border-4 border-transparent rounded-full w-16" src="https://tecdn.b-cdn.net/img/new/avatars/2.webp" />
          <div className="absolute top-4 left-16 rounded-full bg-green-500 w-4 h-4 border-2 border-white dark:border-boxes"></div>
        </div>
        <div className="shadow-lg bg-white dark:bg-boxes w-24 h-24 rounded-md hover:scale-105 hover:shadow-xl transition-all flex-shrink-0 flex flex-row justify-center items-center relative">
          <img className="ring-2 ring-gray-300 dark:ring-gray-600  border-4 border-transparent rounded-full w-16" src="https://tecdn.b-cdn.net/img/new/avatars/22.webp" />
          <div className="absolute top-4 left-16 rounded-full bg-green-500 w-4 h-4 border-2 border-white dark:border-boxes"></div>
        </div>
        <div className="shadow-lg bg-white dark:bg-boxes w-24 h-24 rounded-md hover:scale-105 hover:shadow-xl transition-all flex-shrink-0 flex flex-row justify-center items-center relative">
          <img className="ring-2 ring-gray-300 dark:ring-gray-600 border-4 border-transparent rounded-full w-16" src="https://tecdn.b-cdn.net/img/new/avatars/25.webp" />
          <div className="absolute top-4 left-16 rounded-full bg-green-500 w-4 h-4 border-2 border-white dark:border-boxes"></div>
        </div>
      </div>
    </>
  )
}

export default MenuRooms;