'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

const Providers = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#1EA896"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </>
  )
}

export default Providers
