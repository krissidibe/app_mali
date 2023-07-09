import React from 'react'

function AdminProfileComponent() {
  return (
    <div className="flex flex-col justify-center max-w-xs p-6 rounded-md shadow-md sm:px-12 dark:bg-gray-900 dark:text-gray-100">
	<img src="https://source.unsplash.com/150x150/?portrait?14" alt="" className="w-20 h-20 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
	<div className="space-y-4 text-center divide-y divide-gray-700">
		<div className="my-2 space-y-1">
			<h2 className="font-semibold text-md sm:text-xl">Ousmane Keita</h2>
			<p className="px-2 text-xs sm:text-base dark:text-gray-400">test@test.com</p>
		</div>
		 
	</div>
</div>
  )
}

export default AdminProfileComponent