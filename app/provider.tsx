"use client";
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react';
import React, { useEffect, useState } from 'react'
import { api } from "../convex/_generated/api";
import { UserDetailContext } from '@/context/UserDetailContext';

export default function Provider({ children }: { children: React.ReactNode }) {

    const { user } = useUser();
    const createUser = useMutation(api.user.CreateNewUser);
    const [userDetail, setUserDetail] = useState<any>(null);

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
          <div>{children}</div>
    </UserDetailContext.Provider>
  )
}