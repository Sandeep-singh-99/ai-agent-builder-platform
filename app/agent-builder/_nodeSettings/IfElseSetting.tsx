import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Save } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function IfElseSetting({selectedNode, updateFormData}: {selectedNode: any, updateFormData: any}) {
    const [formData, setFormData] = useState({
        condition: '',
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
        <h2 className='font-bold'>If Else</h2>
        <p className='text-gray-500 mt-1'>
            Create conditions to branch your workflow
        </p>

        <div className='mt-3'>
            <Label>If</Label>
            <Input placeholder='Enter condition here' className='mt-2' value={formData?.condition} onChange={(event) => handleChange('condition', event.target.value)}/>
        </div>

        <Button className='w-full mt-5' onClick={() => {updateFormData(formData); toast.success("If Else Settings Updated Successfully")}}>
            <Save />
            Save
        </Button>
    </div>
  )
}
