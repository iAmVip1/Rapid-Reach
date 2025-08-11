import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, Chip, Stack, Divider, Link as MuiLink, Paper } from '@mui/material'
import RoomIcon from '@mui/icons-material/Room'
import PhoneIcon from '@mui/icons-material/Phone'
import LanguageIcon from '@mui/icons-material/Language'
import CategoryIcon from '@mui/icons-material/Category'
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

  if (!post) return null

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            {post.imageUrls && post.imageUrls.length > 0 ? (
              <CardMedia
                component="img"
                height="320"
                image={post.imageUrls[0]}
                alt={post.departmentName}
              />
            ) : (
              <Box height={320} display="flex" alignItems="center" justifyContent="center" bgcolor="#f5f5f5">
                <Typography color="text.secondary">No image</Typography>
              </Box>
            )}
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Typography variant="h5" fontWeight={700}>{post.departmentName}</Typography>
                {post.category && (
                  <Chip icon={<CategoryIcon />} label={post.category} size="small" color="primary" variant="outlined" />
                )}
              </Stack>
              {post.address && (
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <RoomIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">{post.address}</Typography>
                </Stack>
              )}
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                {post.phoneNumber1 && (
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PhoneIcon fontSize="small" color="action" />
                      <Typography variant="body2">{post.phoneNumber1}</Typography>
                    </Stack>
                  </Grid>
                )}
                {post.phoneNumber2 && (
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PhoneIcon fontSize="small" color="action" />
                      <Typography variant="body2">{post.phoneNumber2}</Typography>
                    </Stack>
                  </Grid>
                )}
                {post.website && (
                  <Grid item xs={12}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <LanguageIcon fontSize="small" color="action" />
                      <MuiLink href={post.website.startsWith('http') ? post.website : `https://${post.website}`} target="_blank" rel="noopener" underline="hover">
                        {post.website}
                      </MuiLink>
                    </Stack>
                  </Grid>
                )}
              </Grid>
              {post.registrationNo && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary">Reg. No: {post.registrationNo}</Typography>
                </>
              )}
              {post.description && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body1">{post.description}</Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ height: 360, overflow: 'hidden' }}>
            {position ? (
              <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={defaultIcon}>
                  <Popup>
                    <Typography variant="subtitle2" fontWeight={700}>{post.departmentName}</Typography>
                    <Typography variant="body2">{post.address}</Typography>
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <Box height="100%" display="flex" alignItems="center" justifyContent="center">
                <Typography color="text.secondary">Location unavailable</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}