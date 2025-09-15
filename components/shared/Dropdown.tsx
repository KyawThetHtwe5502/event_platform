import React, { startTransition, useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ICategory } from '@/lib/database/models/category.model'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '../ui/input'
import { createCategory, getAllCategories } from '@/lib/actions/category.action'

type DropdownProps = {
  value?: string
  onChangeHandler?: (value: string) => void
}

const Dropdown = ({value,onChangeHandler}: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => { 
    createCategory({
      name: newCategory.trim()
    }).then((category) => setCategories((prev) => [...prev,category]))
  };


  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      categoryList && setCategories(categoryList as ICategory[])
    }
    getCategories();
  },[])
  return (
<Select onValueChange={onChangeHandler} defaultValue={value}  >
  <SelectTrigger className="w-full h-[54px]  overflow-hidden rounded-full bg-gray-50 px-4 py-2 border-none shadow-none  outline-offset-0 focus-visible:ring-offset-0 focus-visible:border-0  focus-visible:ring-0">
    <SelectValue placeholder="Category" />
  </SelectTrigger>
  <SelectContent>
    {categories.map((category) => (
          <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>

    ))}
    <AlertDialog>
  <AlertDialogTrigger className='flex w-full rounded-sm py-3 pl-3 text-blue-500 hover:bg-blue-50 focus:text-blue-500'>Add New Category</AlertDialogTrigger>
  <AlertDialogContent className='bg-white'>
    <AlertDialogHeader>
      <AlertDialogTitle>New Category</AlertDialogTitle>
      <AlertDialogDescription>
        <Input type='text' placeholder='Category name' className='mt-3' onChange={(e) => setNewCategory(e.target.value)} />
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  </SelectContent>
</Select>  )
}

export default Dropdown