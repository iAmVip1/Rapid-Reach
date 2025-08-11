import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Configure default Leaflet marker icons for Vite bundling
const defaultIcon = L.icon({
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString(),
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).toString(),
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString(),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export default function Post() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const params = useParams()
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/post/get/${params.postId}`)
        const data = await res.json()
        if (data.success === false) {
          setError(true)
          setLoading(false)
          return
        }
        setPost(data)
        setLoading(false)
        setError(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchPost()
  }, [params.postId])

  const position = useMemo(() => {
    if (!post) return null
    const lat = Number(post.latitude)
    const lng = Number(post.longitude)
    if (Number.isFinite(lat) && Number.isFinite(lng)) return [lat, lng]
    return null
  }, [post])

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>
  }

  if (error) {
    return <div className="text-center mt-6 text-red-500">Error loading post</div>
  }

  if (!post || !position) {
    return <div className="text-center mt-6">Location unavailable</div>
  }

  return (
    <div style={{ height: 'calc(100vh - 160px)', width: '100%' }}>
      <MapContainer center={position} zoom={14} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={defaultIcon}>
          <Popup>
            <div>
              <div style={{ fontWeight: 700 }}>{post.departmentName}</div>
              <div style={{ fontSize: 12 }}>{post.address}</div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}