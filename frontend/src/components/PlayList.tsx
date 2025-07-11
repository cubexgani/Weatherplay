import { useState, useEffect } from 'react';
import './PlayList.css';
import backArrow from '../assets/arrow_back.svg';
import frontArrow from '../assets/arrow_forward.svg';
import PORT from "../consts"

type SongType = {title: string, artist: string};
type TileType = SongType & { isDay: number, bgidx: number };
type WeatherType = {temp: number, rain: number, isDay: number, lang: string}

const tileConfig = {
    alignItems: 'center',
    padding: '20px',
    width: '600px',
    borderColor: 'blueviolet',
    margin: '20px',
    borderRadius: '7px',
}
const dayConfig = {
    ...tileConfig,
    color: 'black',
    backgroundColor: 'rgba(118, 64, 255, 0.3)',
    backdropFilter: `blur(3px)`,
    boxShadow: '-10px 10px 5px #213547',
}
const nightConfig = {
    ...tileConfig,
    backgroundColor: '#7FBBC1',
    boxShadow: '-10px 10px gainsboro'
}

const colours = [
    'rgba(118, 64, 255, 0.3)',
    'rgba(64, 255, 190, 0.3)',
    'rgba(255, 64, 64, 0.3)',
    'rgba(255, 210, 64, 0.3)',
    'rgba(64, 213, 255, 0.3)'
]

function SongTile(songprops: TileType) {
    let defconf = songprops.isDay ? dayConfig : nightConfig;
    let tileconf = {
        ...defconf,
        backgroundColor: colours[songprops.bgidx]
    }
    return (
        <div style={tileconf}>
        <div className='songTitle'>
        <b>{songprops.title}</b>
        </div>
        <div className='songArtist'>
        {songprops.artist}
        </div>
        </div>
    )
}

const playconf = {
    margin: '60px 0px 60px 0px',
    display: 'flex',
    justifyContent: 'space-between'
};


function PlayList({songlist, isDay} : {songlist: SongType[], isDay: number}) {
    const [songind, setSongInd] = useState(0);
    
    if (!songlist) return <div>Fetching the best fit songs....</div>
    function handleNextClick() {
        if (songind == songlist.length - 1) return;
        else setSongInd(songind + 1);
    }
    function handlePrevClick() {
        if (songind == 0) return;
        else setSongInd(songind - 1);
    }
    const songdivs = songlist.map(
        (song, idx) => {
            return (
                
                <SongTile title={song.title} artist={song.artist} isDay={isDay} bgidx={idx} />
            )
        }
    )
    return (
        <div>
        <div style={playconf}>
        <button className='navButton' disabled={songind == 0} onClick={handlePrevClick}>
        <img src={backArrow} />
        </button>
        {songdivs[songind]}
        <button className='navButton' disabled={songind == songlist.length - 1} onClick={handleNextClick}>
        <img src={frontArrow} />
        </button>
        </div>
        </div>
    )
}

function PlayEffect({temp, rain, isDay, lang} : WeatherType) {
    let [playList, setPlayList] = useState<SongType[]>([])
    useEffect(
        () => {
            async function getPlaylist() {
                // Ik this line won't run because this component will be rendered iff lang is not null,
                // but still
                if (!lang) return;
                let response = await fetch(`http://localhost:${PORT}/songs?temp=${temp}&rain=${rain}&lang=${lang}`);
                console.log(response)
                if (response.status == 200) {
                    let songs : SongType[] = await response.json();
                    console.log("songs\n", songs);
                    if (songs) setPlayList(songs);
                }
                else {
                    console.log('Maybe your server isnt turned on??')
                }
            }
            getPlaylist();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [lang]
    )
    if (!lang) return <div>Choose.</div>
    return (
        <>
        <div> Here are top 5 songs you can vibe to right now:</div>
        <PlayList songlist={playList} isDay={isDay} />
        </>
    )
}

export default PlayEffect;