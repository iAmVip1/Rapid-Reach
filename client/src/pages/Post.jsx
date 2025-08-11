import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Default Leaflet marker icon (local assets via package)
const defaultIcon = L.icon({
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString(),
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).toString(),
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString(),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// Colored marker icons from leaflet-color-markers (remote, lightweight)
const makeColorIcon = (color) => L.icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
  iconRetinaUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString(),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const getIconForCategory = (category) => {
  const normalized = (category || '').toLowerCase()
  if (normalized.includes('hospital')) return makeColorIcon('red')
  if (normalized.includes('blood')) return makeColorIcon('violet')
  if (normalized.includes('police')) return makeColorIcon('blue')
  if (normalized.includes('fire')) return makeColorIcon('orange')
  return defaultIcon
}

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

  const markerIcon = useMemo(() => getIconForCategory(post?.category), [post?.category])

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
        <Marker position={position} icon={markerIcon}>
          <Popup>
            <div>
              <div style={{ fontWeight: 700 }}>{post.departmentName}</div>
              <div style={{ fontSize: 12 }}>{post.address}</div>
              {post.category && (
                <div style={{ fontSize: 12, marginTop: 4 }}>Category: {post.category}</div>
              )}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}