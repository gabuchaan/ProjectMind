import React, { useContext, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { SocketContext } from '../Js/SocketContext';


const Options = ({ children }) => {

  const { me, callAccepted, name, setName, callEnded, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');



  return (
    <div className=' text-white'>
      <div className='flex flex-col'>
        <div>Account info</div>
        <input placeholder='name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <CopyToClipboard text={me} >
          <button className='bg-gray-600 text-white rounded-full w-auto'>
            copy your id
          </button>
        </CopyToClipboard>
      </div>


      <div className='flex flex-col'>
        <div>make a call</div>
        <input placeholder='id to call' type="text" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
        {callAccepted && !callEnded ? (
          <button className='bg-red' >Colgar</button>
        ) : (
          <button className='bg-green-400 rounded-full' onClick={() => callUser(idToCall)}>Llamar</button>
        )}

      </div>
      

      {children}
    </div>
  )
}

export default Options
