import * as React from 'react';
import { olioColor } from '../utils/constants';

export const Loading = ()=>{
    return <div className='w-full h-full flex justify-center items-center absolute' style={{background: olioColor, zIndex: 200}}>
        <img style={{width: '80%'}} src="./olio2.png" alt="" />
    </div>
}