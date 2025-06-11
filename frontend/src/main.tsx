import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WeatherApp from './WeatherApp.tsx'

// const list = [
//     {
//         title: "A",
//         artist: "b",
//     },
//     {
//         title: "C",
//         artist: "d",
//     },
    
//     {
//         title: "E",
//         artist: "f",
//     },
//     {
//         title: "G",
//         artist: "h",
//     },
//     {
//         title: "I",
//         artist: "j",
//     },
    
// ];

createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <WeatherApp />
    </StrictMode>,
)
