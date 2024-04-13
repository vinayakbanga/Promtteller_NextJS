"use client"


import { SessionProvider } from 'next-auth/react'
// import React from 'react'

// SessionProvider

const Provider = ({ children, session }) => (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )

export default Provider