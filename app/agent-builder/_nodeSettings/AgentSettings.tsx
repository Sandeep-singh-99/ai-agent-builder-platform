import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { FileJson, Save } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AgentSettings({selectedNode, updateFormData}: {selectedNode: any, updateFormData: any}) {
    const [formData, setFormData] = useState({
        name: '',
        instructions: '',
        includeChatHistory: true,
        model: 'gemini-1.5-flash',
        outputFormat: 'Text',
        schema: '',
    })

    useEffect(() => {
        selectedNode && setFormData(selectedNode?.data?.settings)
    }, [selectedNode])

    const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const onSave = () => {
       try {
         console.log("formData", formData);
        
        updateFormData(formData);
        toast.success("Agent Settings Updated Successfully");
       } catch (error) {
        toast.error("Something went wrong");
       }
    }


  return (
    <div>
        <h2 className='font-bold'>Agent</h2>
        <p className='text-gray-500 mt-1'>Call the AI model your instructions</p>

        <div className='mt-3 space-y-1'>
            <Label>Name</Label>
            <Input placeholder='Agent Name' value={formData?.name} onChange={(event) => handleChange('name', event.target.value)}/>
        </div>

        <div className='mt-3 space-y-1'>
            <Label>Instructions</Label>
            <Textarea placeholder='Instructions' value={formData?.instructions} onChange={(event) => handleChange('instructions', event.target.value)}/>
            <h2 className='text-sm flex items-center gap-2 p-1'>Add Context <FileJson className='h-3 w-3' /></h2>
        </div>
        <div className='mt-3 flex justify-between items-center'>
            <Label>Include Chat History</Label>
            <Switch checked={formData?.includeChatHistory} onCheckedChange={(checked) => handleChange('includeChatHistory', checked)} />
        </div>
        <div className='mt-3 flex justify-between items-center'>
            <Label>Model</Label>
            <Select onValueChange={(value) => handleChange('model', value)} value={formData?.model}>
                <SelectTrigger>
                    <SelectValue placeholder="gemini-1.5-flash"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                    <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                    <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                    <SelectItem value="gemini-2.5-pro">Gemini 2.5 Pro</SelectItem>
                </SelectContent>
            </Select>   
        </div>

        <div className='mt-3 space-y-3'>
            <Label>Ouput Format</Label>
            <Tabs defaultValue='Text' className='w-[400px]' onValueChange={(value) => handleChange('outputFormat', value)} value={formData?.outputFormat}>
                <TabsList>
                    <TabsTrigger value='Text'>Text</TabsTrigger>
                    <TabsTrigger value='JSON'>JSON</TabsTrigger>
                </TabsList>
                <TabsContent value='Text'>
                    Output will be Text
                </TabsContent>
                <TabsContent value='JSON'>
                    <Label className='text-sm text-gray-500'>Enter Json Schema</Label>
                    <Textarea placeholder='{title:String}' className='max-w-[300px] mt-1' value={formData?.schema} onChange={(value) => handleChange('schema', value.target.value)} />
                </TabsContent>
            </Tabs>
        </div>
        <Button className='w-full mt-5' onClick={onSave}>
            <Save />
            Save
        </Button>
    </div>
  )
}
