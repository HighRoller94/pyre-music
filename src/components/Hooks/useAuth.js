import { useState, useEffect } from 'react'
import axios from 'axios'

const code = new URLSearchParams(window.location.search).get('code')

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(() => {
        axios.post("http://localhost:3001/login", {
            code,
        }).then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            window.history.pushState({}, null, '/dashboard')
        })
    }, [code])

    useEffect(() => {
      if (!refreshToken || !expiresIn) return
      const interval = setInterval(() => {
        axios.post("http://localhost:3001/refresh", {
          refreshToken,
        }).then(res => {
          setAccessToken (res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        }, (expiresIn - 120) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return accessToken;
}

