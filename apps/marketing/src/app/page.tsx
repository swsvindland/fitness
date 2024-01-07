import { Suspense } from 'react'
import { LoadingPage } from '@fitness/ui'

export default async function HomePage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <>
        <div className="flex w-full flex-col gap-2">
          <h1>Search</h1>
        </div>
      </>
    </Suspense>
  )
}
