import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Save } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function WhileSettings({selectedNode, updateFormData}: {selectedNode: any, updateFormData: any}) {
    const [formData, setFormData] = useState({
        whileCondition: '',
    })

    const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    useEffect(() => {
        selectedNode && setFormData(selectedNode?.data.settings)
    }, [selectedNode])
  return (
    <div>
        <h2 className='font-bold'>While</h2>
        <p className='text-gray-500 mt-1'>
            Loop your logic
        </p>

        <div className='mt-3'>
            <Label>While Condition</Label>
            <Input placeholder='Enter condition here' className='mt-2' value={formData?.whileCondition} onChange={(event) => handleChange('whileCondition', event.target.value)}/>
        </div>

        <Button className='w-full mt-5' onClick={() => {updateFormData(formData); toast.success("While Settings Updated Successfully")}}>
            <Save />
            Save
        </Button>
    </div>
  )
}
