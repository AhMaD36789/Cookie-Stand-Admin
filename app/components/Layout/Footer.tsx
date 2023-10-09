import React from 'react'

type FooterProps = {
  numLocations: number;
}

const Footer: React.FC<FooterProps> = ({numLocations}) => {
  return (
    <div className='bg-green-500 text-black p-4'>
        {numLocations} Locations World Wide
    </div>
  )
}

export default Footer