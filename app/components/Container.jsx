import React from 'react'

const Container = ({children, classes}) => {
  return (
    <div className={`relative h-full max-w-[1240px] px-0 mx-auto p-0 ${classes}`}>{children}</div>
  )
}

export default Container