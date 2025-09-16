"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import DatePicker from "react-datepicker";
import "@uploadthing/react/styles.css";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import { eventDefaultValues } from "@/app/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "../ui/textarea"
import FileUpload from "./FileUploader"
import { useState } from "react"
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { PiLinkSimple } from "react-icons/pi";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox"
import { createEvent } from "@/lib/actions/event.action"
import { useRouter } from "next/navigation"

type EventFormProps = {
    userId: string
    type: 'Create' | 'Update'
}


const EventForm = ({userId,type}: EventFormProps) => {
    const [files, setFiles] = useState<File[]>([]);
    console.log(files,'files')
    const router = useRouter();
    const initialValues = eventDefaultValues;
    const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  })

     async function onSubmit(values: z.infer<typeof eventFormSchema>) {
      let uploadedImageUrl = values.imageUrl;
      if(files.length > 0 ){
        
      }
      if(type === "Create"){
        try {
          const newEvent = await createEvent({
            event: {...values,imageUrl: uploadedImageUrl},
            userId,
          path: '/event'          });
          console.log(newEvent,'New Event')
          if(newEvent){
            form.reset();
            router.push(`/event/${newEvent._id}`)
          }
        } catch(error){
          console.log(error)
        }
      }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2  ">
               <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Event title" {...field}  className="h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2 border-none shadow-none  outline-offset-0 focus-visible:ring-offset-0 focus-visible:border-0  focus-visible:ring-0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Dropdown onChangeHandler={field.onChange} value={field.value}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="h-72">
                <Textarea placeholder="Description" {...field} className="w-full overflow-hidden rounded-2xl bg-gray-50 px-4 py-2 border-none shadow-none  outline-offset-0 focus-visible:ring-offset-0 focus-visible:border-0  focus-visible:ring-0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="h-72">
                <FileUpload onFileChange={field.onChange} imageUrl={field.value} setFiles={setFiles}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
<FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                  <FaMapMarkerAlt className="text-gray-500 size-6" />
                <Input placeholder="Event location or Online" {...field} className="border-none shadow-none  focus-visible:ring-0" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDateTime"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                  <FaCalendarAlt className="text-gray-500 size-6" />
                  <p className="mx-3 whitespace-nowrap text-gray-600">Start Date:</p>
   <DatePicker selected={field.value} onChange={(date: Date | null) => field.onChange(date)} showTimeSelect timeInputLabel="Time:" dateFormat={"MM/dd/yyyy h:mm aa"} wrapperClassName="datePicker" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDateTime"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className=" flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                  <FaCalendarAlt className="text-gray-500 size-6" />
                  <p className="mx-3 whitespace-nowrap text-gray-600">End Date:</p>
   <DatePicker selected={field.value} onChange={(date: Date | null) => field.onChange(date)} showTimeSelect timeInputLabel="Time:" dateFormat={"MM/dd/yyyy h:mm aa"} wrapperClassName="datePicker" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className=" flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                  <FaDollarSign className="text-gray-500 size-6" />
                <Input type="number" placeholder="Price" {...field} className="border-none shadow-none bg-gray-50 outline-offset-0 focus-visible:ring-offset-0 focus-visible:border-0  focus-visible:ring-0" />
                <FormField
          control={form.control}
          name="isFree"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center h-[54px] w-full px-4 py-2">
                  <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >Free Ticket</label>
                <Checkbox id="isFree" checked={field.value}  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
             <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                <PiLinkSimple className="text-gray-500 size-6" />
                <Input placeholder="URL" {...field} className="border-none shadow-none bg-gray-50 outline-offset-0 focus-visible:ring-offset-0 focus-visible:border-0  focus-visible:ring-0" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
        <Button type="submit" size={"lg"} disabled={form.formState.isSubmitting} className="bg-blue-600 col-span-2">{form.formState.isSubmitting ? ('Submitting...') : `${type} Event`}</Button>
      </form>
    </Form>
  )
}

export default EventForm