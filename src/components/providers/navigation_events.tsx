'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { resetMyProfile } from '../../data/get_profile'
import { toast } from 'react-toastify'
import { setAuthState } from '../../data/login'
import { setVerifyState } from '../../data/modal_checker'
import useHash from '../hooks/use_hash'
import { setAuthToken } from '../../utils/axios'
import { getNotifications } from '../../data/get_notifications'
const NavigationContext = createContext({})

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const params = useParams();
  const hash = useHash();

  useEffect(() => {
    dispatch(getNotifications())
  }, [])

  return (
    <NavigationContext.Provider value={{}} />
  )
}

export const useNavigation = () => useContext(NavigationContext);