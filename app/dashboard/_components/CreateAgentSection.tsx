import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

export default function CreateAgentSection() {
  return (
    <div className='space-y-2 flex flex-col justify-center items-center mt-24'>
        <h2 className='font-bold text-3xl'>Create AI Agent</h2>
        <p>Build a AI Agent workflow with custom logic and tools</p>
        <Button size={'lg'} variant={"secondary"}>
            <Plus />
            Create
        </Button>
    </div>
  )
}
