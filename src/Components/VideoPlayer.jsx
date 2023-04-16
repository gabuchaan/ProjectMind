import React, { useContext } from 'react'

import { SocketContext } from '../Js/SocketContext'

const VideoPlayer = () => {

  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext)


  return (
    <div className='flex'>

      {/*mi video*/}
      {
        stream && (
          <div className='flex flex-col'>
            <div>{name || 'Nombre'}</div>
            <div className='bg-transparent'>
              <div className='bg-black w-auto pl-4 pr-4 rounded-md h-7 fixed bottom-80 ml-3 opacity-70'>Yasser Sarghini</div>
              <video playsInline ref={myVideo} muted autoPlay style={{ width: '550px', height: '450px', borderRadius: '20px' }} >
              </video>
            </div>


          </div>

        )
      }

      {/*user video*/}
      {
        callAccepted && !callEnded && (
          <div className='flex flex-col ml-3'>
            <div>{call.name || 'Nombre'}</div>
            <div className='bg-transparent'>
              <video playsInline ref={userVideo} autoPlay style={{ width: '550px', height: '450px', borderRadius: '20px' }} >

              </video>

            </div>
          </div>
        )
      }

    </div>
  )
}

export default VideoPlayer
