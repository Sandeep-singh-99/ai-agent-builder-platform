import { Button } from '@/components/ui/button'
import { Agent } from '@/types/AgentTypes'
import { ChevronLeft, Code, Play } from 'lucide-react'

type Props = {
    agentDetail: Agent | undefined
}

export default function Header({ agentDetail }: Props) {
  return (
    <div className='w-full p-3 flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
            <ChevronLeft className='h-8 w-8' />
            <h2 className='text-xl'>{agentDetail?.name}</h2>
        </div>
        <div className='flex items-center gap-3'>
            <Button variant={"ghost"}>
                <Code />
                Code
            </Button>
            <Button>
                <Play/>
                Preview
            </Button>
            <Button>
                Publish
            </Button>
        </div>
    </div>
  )
}
