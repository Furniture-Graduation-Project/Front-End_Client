import React from 'react'

interface TextTitleProps {
  checkout?: boolean
  order?: boolean
  title: string
}

const TextTitle: React.FC<TextTitleProps> = ({title }) => {
  return (
      <h1 className='font-medium text-[54px] text-center mb-10'>{title}</h1>
  )
}

export default TextTitle
