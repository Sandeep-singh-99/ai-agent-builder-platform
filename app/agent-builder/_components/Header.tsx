import { Button } from '@/components/ui/button'
import { ChevronLeft, Code, Play } from 'lucide-react'


export default function Header() {
  return (
    <div className='w-full p-3 flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
            <ChevronLeft className='h-8 w-8' />
            <h2 className='text-xl'>Agent Name</h2>
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
