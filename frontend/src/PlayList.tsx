// const BASE_URL = '127.0.0.1';
// const PORT = 8000;

// let playlist = await fetch(BASE_URL + '/' + PORT)

import './SongTile.css'

export type SongType = {title: string, artist: string}

function SongTile(songprops: SongType) {
    return (
        <div className="song">
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

function PlayList({songlist} : {songlist: SongType[]}) {
    if (!songlist) return <div>Fetching the best fit songs....</div>
    const songdivs = songlist.map(
        song => {
            // Obligatory unique key
            let k = Math.round(song.title.length * Math.random());
            return (
                <li className="nice" key={k}>
                <SongTile title={song.title} artist={song.artist} />
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