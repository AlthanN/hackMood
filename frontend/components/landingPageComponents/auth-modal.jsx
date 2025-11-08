"use client"

import { useState, useEffect } from "react"
import { X, Eye, EyeOff, Loader2 } from "lucide-react"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8888'

export default function AuthModal({ onClose }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Check for Spotify auth tokens in URL hash
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')
    const error = params.get('error')

    if (error) {
      console.error('Spotify auth error:', error)
      alert('Authentication failed. Please try again.')
      window.location.hash = ''
    } else if (access_token) {
      // Store tokens in localStorage
      localStorage.setItem('spotify_access_token', access_token)
      if (refresh_token) {
        localStorage.setItem('spotify_refresh_token', refresh_token)
      }

      // Clear hash from URL
      window.location.hash = ''

      // Fetch user profile
      fetchSpotifyProfile(access_token)
    }
  }, [])

  const fetchSpotifyProfile = async (token) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const profile = await response.json()
        console.log('Logged in as:', profile.display_name)
        localStorage.setItem('spotify_user', JSON.stringify(profile))

        // Close modal and potentially redirect or update UI
        onClose()
        // You can add a callback here to notify parent component of successful login
      } else {
        console.error('Failed to fetch profile')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate auth logic
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setIsLoading(false)
      onClose()
    }, 1500)
  }

  const handleSpotifyAuth = () => {
    // Redirect to backend Spotify auth endpoint
    window.location.href = `${BACKEND_URL}/login`
  }

  const handleSocialAuth = (provider) => {
    if (provider === "Spotify") {
      handleSpotifyAuth()
    } else {
      setIsLoading(true)
      console.log(`Authenticating with ${provider}`)
      setTimeout(() => {
        setIsLoading(false)
        onClose()
      }, 1500)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-foreground/20 rounded-lg w-full max-w-md mx-4 relative animate-slide-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-foreground/10 rounded-lg transition"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-foreground/60 mb-6">
            {isSignUp ? "Join SoundScape and discover your world" : "Sign in to your account"}
          </p>

          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialAuth("Spotify")}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg font-semibold transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Continue with Spotify
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialAuth("Google")}
                disabled={isLoading}
                className="px-4 py-2 border border-foreground/20 rounded-lg font-medium text-foreground hover:bg-foreground/10 transition disabled:opacity-50"
              >
                Google
              </button>
              <button
                onClick={() => handleSocialAuth("Discord")}
                disabled={isLoading}
                className="px-4 py-2 border border-foreground/20 rounded-lg font-medium text-foreground hover:bg-foreground/10 transition disabled:opacity-50"
              >
                Discord
              </button>
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-foreground/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-foreground/60">or</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition"
                placeholder="you@example.com"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground disabled:opacity-50"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition"
                  placeholder="••••••••"
                  required={isSignUp}
                  disabled={isLoading}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-accent text-background rounded-lg font-semibold hover:bg-accent/90 transition mt-6 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {isSignUp ? "Creating Account..." : "Signing In..."}
                </>
              ) : isSignUp ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <p className="text-center text-foreground/60 text-sm mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setFormData({ email: "", password: "", confirmPassword: "" })
              }}
              disabled={isLoading}
              className="ml-2 text-accent hover:underline font-semibold disabled:opacity-50"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
