import { WorkflowContext } from '@/context/WorkflowContext'
import React, { useContext } from 'react'

export default function SettingPanel() {
    const { selectedNode } = useContext(WorkflowContext);
    
  return (
    <div className='p-5 bg-white rounded-2xl w-[350px] shadow'>

    </div>
  )
}
