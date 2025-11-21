"use client";
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react';
import React, { useEffect, useState } from 'react'
import { api } from "../convex/_generated/api";
import { UserDetailContext } from '@/context/UserDetailContext';
import { WorkflowContext } from '@/context/WorkflowContext';

export default function Provider({ children }: { children: React.ReactNode }) {

    const { user } = useUser();
    const createUser = useMutation(api.user.CreateNewUser);
    const [userDetail, setUserDetail] = useState<any>(null);
    const [addedNodes, setAddedNodes] = useState([{
        id: 'start',
        position: {x:0, y:0},
        data: {label: 'Start'},
        type: 'StartNode'
    }]);

    const [nodeEdges, setNodeEdges] = useState([]);

    useEffect(() => {
        CreateAndGetUser();
    },[user])

    const CreateAndGetUser = async () => {
        if (user) {
            const result = await createUser({
                name: user.fullName??'',
                email: user.primaryEmailAddress?.emailAddress??'',
                imageUrl: user.imageUrl ?? '',
            })
            setUserDetail(result);
        }
    }
  return (
    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
        <WorkflowContext.Provider value={{addedNodes, setAddedNodes, nodeEdges, setNodeEdges}}>
          <div>{children}</div>
        </WorkflowContext.Provider>
    </UserDetailContext.Provider>
  )
}