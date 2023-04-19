import React from 'react'

const MemberCard = () => {
    return (
        <div className="flex flex-col items-center p-3 w-28 h-32 pt-5 cursor-pointer bg-white border-gray-300 border dark:border-gray-700 dark:bg-bars rounded-md space-y-1 hover:scale-105 hover:shadow-xl  transition-all">
            <img className="ring-2 ring-gray-600 border-4 border-transparent rounded-full w-16" src="https://tecdn.b-cdn.net/img/new/avatars/8.webp" />
            <div className="font-extralight font-monserrat text-back dark:text-white">Carlos</div>
        </div>
    )
}

export default MemberCard
