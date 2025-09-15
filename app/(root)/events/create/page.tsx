"use client"
import EventForm from '@/components/shared/EventForm'
import { useUser } from '@clerk/nextjs'
// import { auth } from '@clerk/nextjs/server'
import React from 'react'

const CreateEvent = () => {
    // const dd = auth();

    // const userId = sessionClaims?.userId as string
    // console.log(userId,'userId')
    const {user} = useUser();
    const userId = user?.id as string;
    console.log(userId,'userId from create event')
  return (
    <>
    <section className='bg-gray-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <h3 className='text-center font-bold text-2xl'>Create Event</h3>
    </section>
    <div className='my-8 wrapper'>
        <EventForm userId={userId} type="Create" />
    </div>
    </>
  )
}

export default CreateEvent