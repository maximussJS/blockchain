import React from 'react'

const Item = ({
    item
}) =>
    <div className='center'>
         <div className='item'>
             {item.master}
         </div>
         <div className='item'>
             {item.whom}
         </div>
         <div className='item'>
             {item.amount} $
         </div>
        <div className='item'>
            {item.time.length > 7 ? item.time.slice(0, -7) : item.time}
        </div>
    </div>

export default Item