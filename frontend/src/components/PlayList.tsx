// const BASE_URL = '127.0.0.1';
// const PORT = 8000;

// let playlist = await fetch(BASE_URL + '/' + PORT)

import './SongTile.css'

export type SongType = {title: string, artist: string};

type TileType = SongType & { isDay: number };

const tileConfig = {
    padding: '20px',
    width: '600px',
    borderColor: 'blueviolet',
    margin: '20px',
    color: 'black',
}
const dayConfig = {
    ...tileConfig,
    backgroundColor: 'antiquewhite',
    'box-shadow': '-10px 10px black',
}
const nightConfig = {
    ...tileConfig,
    backgroundColor: '#7FBBC1',
    'box-shadow': '-10px 10px gainsboro'
}

function SongTile(songprops: TileType) {
    let conf = songprops.isDay ? dayConfig : nightConfig;
    return (
        <div style={conf}>
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
        song => {
            // Obligatory unique key
            let k = Math.round(song.title.length * Math.random());
            return (
                <li className="nice" key={k}>
                <SongTile title={song.title} artist={song.artist} isDay={isDay} />
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