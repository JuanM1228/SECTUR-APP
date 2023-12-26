import Icons from '@/assets/icons'
import React from 'react'

const DashboardCard = ({ iconName, title, value }) => {
  const CustomIcon = Icons[iconName] || Icons['Person']
  return (
    <div className="flex justify-center items-center gap-4 p-4 font-Montserrat grow rounded bg-manatee bg-opacity-20">
      <CustomIcon className="w-20 h-20 text-gray" />
      <div className="flex flex-col">
        <p className="font-semibold">{title}</p>
        <p>{value}</p>
      </div>
    </div>
  )
}

export default DashboardCard
