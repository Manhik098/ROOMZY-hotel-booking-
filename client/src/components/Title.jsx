import React from 'react'

const Title = (props) => {
  return (
    <div className={`flex flex-col justify-center items-center text-center ${props.align=== "left" && "md:items-start md:text-left"}`}>
      <h1 className={`text-4xl md:text-[40px] ${props.font || "font-playFair"}`}>{props.title}</h1>
      <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>{props.subTitle}</p>
    </div>
  )
}

export default Title
