import { useState } from 'react';
import './PlayList.css';
import backArrow from '../assets/arrow_back.svg';
import frontArrow from '../assets/arrow_forward.svg';

export type SongType = {title: string, artist: string};

type TileType = SongType & { isDay: number, bgidx: number };

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

export default PlayList;