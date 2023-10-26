import React from 'react'

function FooterMidList({title,listItem}) {
  return (
    <div>
      <div>
            <h3 className='font-titleFont text-white text-base font-semibold mb-3 '>{title}</h3>
                <ul className='flex flex-col gap-2 font-bodyFont'>
                    {
                        listItem.map((item)=>item.ListData.map((data,i)=>(
                            <li key={i} className='footerLink text-xs'>{data}</li>
                        )))
                    }
                </ul>
        </div>
        
    </div>
  )
}

export default FooterMidList
