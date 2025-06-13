// const BASE_URL = '127.0.0.1';
// const PORT = 8000;

// let playlist = await fetch(BASE_URL + '/' + PORT)

import './PlayList.css'

export type SongType = {title: string, artist: string};

type TileType = SongType & { isDay: number, bgidx: number };

const tileConfig = {
    padding: '20px',
    width: '600px',
    borderColor: 'blueviolet',
    margin: '20px',
    color: 'black',
}
const dayConfig = {
    ...tileConfig,
    backgroundColor: 'rgba(118, 64, 255, 0.3)',
    backdropFilter: `blur(3px)`,
    'box-shadow': '-10px 10px 5px #213547',
}
const nightConfig = {
    ...tileConfig,
    backgroundColor: '#7FBBC1',
    'box-shadow': '-10px 10px gainsboro'
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
            <span>
                <div className='songTitle'>
                    <b>{songprops.title}</b>
                </div>
                <div className='songArtist'>
                    {songprops.artist}
                </div>
            </span>
        </div>
    )
}

function PlayList({songlist, isDay} : {songlist: SongType[], isDay: number}) {
    if (!songlist) return <div>Fetching the best fit songs....</div>
    const songdivs = songlist.map(
        (song, idx) => {
            // Obligatory unique key
            return (
                <li className="nice" key={idx}>
                <SongTile title={song.title} artist={song.artist} isDay={isDay} bgidx={idx} />
                </li>
            )
        }
    );
    return (
        <ul >
            {songdivs}
        </ul>
    )
}

export default PlayList;