'use client'

import { useRequestsStore } from '@/stores/requests/requests.provider'
import RequestCard from './(components)/request-card'
import { useShallow } from 'zustand/shallow'
import { useEffect, useState } from 'react'
import useGetRequests from './(hooks)/useGetRequests'
import { ClipLoader } from 'react-spinners'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/app/(components)/ui/select'
import { useGeneralStore } from '@/stores/general/general.provider'

export default function RequestsHistoryPage() {
  const { requests, hasHydrated, filteredRequests, setFilteredRequests } =
    useRequestsStore(
      useShallow((store) => ({
        requests: store.requests,
        filteredRequests: store.filteredRequests,
        setFilteredRequests: store.setFilteredRequests,
        hasHydrated: store.hasHydrated,
      })),
    )
  const { isRendering, isLoading } = useGeneralStore(
    useShallow((store) => ({
      isLoading: store.isLoading,
      isRendering: store.isRendering,
    })),
  )

  const [selectedUser, setSelectedUser] = useState('resetFilter')
  const [selectedWedding, setSelectedWedding] = useState('resetFilter')

  const getRequests = useGetRequests()

  useEffect(() => {
    getRequests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let filtered = requests

    if (selectedUser !== 'resetFilter') {
      filtered = filtered.filter((r) => r.requestByName === selectedUser)
    }

    if (selectedWedding !== 'resetFilter') {
      filtered = filtered.filter((r) => r.weddingTitle === selectedWedding)
    }

    setFilteredRequests(filtered)
  }, [selectedUser, selectedWedding, requests, setFilteredRequests])

  if (!hasHydrated || isRendering) {
    return (
      <div className="flex flex-col m-auto h-screen justify-center items-center">
        <ClipLoader color="#92400e" size={150} />
      </div>
    )
  }
  return (
    <div className="px-3">
      <div className="py-5 text-2xl font-poppins text-amber-800 font-semibold flex flex-col gap-2 px-4 items-center text-center">
        <h1>See all of the requests to your weddings' lists below:</h1>
        <h2 className="text-[14px] sm:text-[18px] text-stone-500 font-normal max-w-[500px] leading-[1.3]">
          You can accept or deny a request, and see the ones who were already
          accepted or denied as well.
        </h2>
      </div>
      <div className="flex flex-col mx-auto">
        <div className="flex flex-row items-center mx-auto max-w-[600px] gap-6">
          <div>
            <Select onValueChange={(value) => setSelectedUser(value)}>
              <SelectTrigger className="w-[150px] sm:w-[180px] !text-amber-800">
                <SelectValue placeholder="Users Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Users</SelectLabel>
                  <SelectItem value="resetFilter">All Users</SelectItem>
                  {[...new Set(requests.map((r) => r.requestByName))].map(
                    (name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ),
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select onValueChange={(value) => setSelectedWedding(value)}>
              <SelectTrigger className="w-[150px] sm:w-[180px] !text-amber-800">
                <SelectValue placeholder="Lists Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Lists</SelectLabel>
                  <SelectItem value="resetFilter">All Lists</SelectItem>
                  {[...new Set(requests.map((r) => r.weddingTitle))].map(
                    (name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ),
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col items-center mx-auto py-5 gap-5">
          {filteredRequests.length > 0 ? (
            filteredRequests
              .sort((a, b) => Number(b.pending) - Number(a.pending))
              .map((request) => (
                <RequestCard
                  key={request.id}
                  requestId={request.id}
                  madeOn={request.madeOn}
                  weddingTitle={request.weddingTitle}
                  requestByName={request.requestByName}
                  pending={request.pending}
                  accepted={request.accepted}
                  isLoading={isLoading}
                />
              ))
          ) : (
            <div className="font-inter text-stone-700 font-semibold text-xl text-center">
              No requests to show at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
