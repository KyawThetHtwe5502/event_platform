import EventForm from '@/components/shared/EventForm'
import { useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const UpdateEvent = () => {
    const {user} = useUser();
    const userId = user?.id as string;
  return (
    <>
    <section className='bg-gray-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <h3 className='text-center font-bold text-2xl'>Update Event</h3>
    </section>
    <div className='my-8 wrapper'>
        <EventForm userId={userId} type="Update" />
    </div>
    </>
  )
}

export default UpdateEvent