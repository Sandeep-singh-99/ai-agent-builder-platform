"use client";

import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { Agent } from '@/types/AgentType';
import { useConvex } from 'convex/react';
import { GitBranchPlusIcon } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment';

export default function MyAgents() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [agentList, setAgentList] = useState<Agent[]>();

  const convex = useConvex();

  const GetUserAgents = async () => {
    const results = await convex.query(api.agent.GetUserAgents, {
      userId: userDetail?._id
    })

    setAgentList(results)
  }

  useEffect(() => {
    userDetail && GetUserAgents();
  }, [userDetail]);


  return (
    <div className='w-full mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {
          agentList?.map((agent, index) => (
            <div key={index} className='p-3 border rounded-2xl shadow-xl'>
              <GitBranchPlusIcon  className='bg-yellow-100 dark:text-black p-1 h-8 w-8 rounded-sm'/>
              <h1 className='mt-3'>{agent.name}</h1>
              <p className='text-sm text-gray-400 mt-2'>{ moment(agent._creationTime).fromNow() }</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
