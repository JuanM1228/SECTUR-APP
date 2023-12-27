import React from 'react'
import DashboardCard from './DashboardCard'

const DashboardSection = ({ data }) => {
  const { total, finalizado, rechazado, revision, expirado } = data
  return (
    <section className="flex gap-5 overflow-x-auto h-auto overflow-hidden mb-5">
      <DashboardCard
        iconName="AccountCircle"
        title="TOTAL DE PSTs"
        value={total}
      />
      <DashboardCard
        iconName="CheckCircle"
        title="PSTs Autorizados"
        value={finalizado}
      />
      <DashboardCard
        iconName="Cancel"
        title="PSTs Rechazados"
        value={rechazado}
      />
      <DashboardCard
        iconName="WatchLater"
        title="PSTs pendientes"
        value={revision}
      />
      <DashboardCard
        iconName="Error"
        title="PSTs por actualizar"
        value={expirado}
      />
    </section>
  )
}

export default DashboardSection
