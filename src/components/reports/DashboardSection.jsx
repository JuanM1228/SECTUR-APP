import React from 'react'
import DashboardCard from './DashboardCard'

const DashboardSection = () => {
  return (
    <section className="flex gap-5 overflow-x-auto h-auto overflow-hidden mb-5">
      <DashboardCard
        iconName="AccountCircle"
        title="TOTAL DE PSTs"
        value={48000}
      />
      <DashboardCard
        iconName="CheckCircle"
        title="PSTs Autorizados"
        value={48000}
      />
      <DashboardCard iconName="Cancel" title="PSTs Rechazados" value={48000} />
      <DashboardCard
        iconName="WatchLater"
        title="PSTs pendientes"
        value={48000}
      />
      <DashboardCard
        iconName="Error"
        title="PSTs por actualizar"
        value={48000}
      />
    </section>
  )
}

export default DashboardSection
