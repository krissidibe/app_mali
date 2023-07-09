import React from 'react'
import AdminProfileComponent from './AdminProfileComponent'

function page() {
  return (
    <div className="flex flex-wrap gap-4">
        
        <AdminProfileComponent/>
        <AdminProfileComponent/>
        <AdminProfileComponent/>
        <AdminProfileComponent/>
    </div>
  )
}

export default page