import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Save } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function UserApprovalSettings({selectedNode, updateFormData}: {selectedNode: any, updateFormData: any}) {
    const [formData, setFormData] = useState({
        name: '',
        message: '',
    })

    const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    useEffect(() => {
        selectedNode && setFormData(selectedNode?.data?.settings)
    }, [selectedNode])


  return (
    <div>
        <h2 className='font-bold'>User Approval</h2>
        <p className='text-gray-500 mt-1'>
            Puase for a human to approve or reject a step
        </p>
         <div className='mt-3 space-y-1'>
            <Label>Name</Label>
            <Input placeholder='Agent Name' value={formData?.name} onChange={(event) => handleChange('name', event.target.value)}/>
        </div>

        <div className='mt-3 space-y-1'>
            <Label>Message</Label>
            <Textarea placeholder='Describe the message to show to the user' value={formData?.message} onChange={(event) => handleChange('message', event.target.value)}/>
        </div>

        <Button className='w-full mt-5' onClick={() => {updateFormData(formData); toast.success("User Approval Settings Updated Successfully")}}>
            <Save />
            Save
        </Button>
    </div>
  )
}
