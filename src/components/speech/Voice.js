import React, { Component } from 'react'

export default class Voice extends Component {
    render() {
        return (
            <div>
               	<h1>Audio Recording Demo With WebAudioRecorder.js</h1>
                <p><small>Made by the <a href="https://addpipe.com" target="_blank">Pipe Video Recording Platform</a></small></p>
                <p>This demo shows you how to use <a href="https://github.com/higuma/web-audio-recorder-js" target="_blank">WebAudioRecorder.js</a> - a JavaScript library written in 2015 by higuma - to record audio and encode to common formats (pcm, Vorbis, mp3) directly in the browser.</p>
                <p>Check out the <a href="https://github.com/addpipe/simple-web-audio-recorder-demo" target="_blank">code on GitHub</a> and our <a href="https://addpipe.com/blog/using-webaudiorecorder-js-to-record-audio-on-your-website/" target="_blank">blog post on using WebAudioRecorder.js to Record MP3, Vorbis and WAV Audio</a>.</p>
                <div >
                    <p>Convert recorded audio to:</p>
                    <select id="encodingTypeSelect">
                    <option value="wav">Waveform Audio (.wav)</option>
                    <option value="mp3">MP3 (MPEG-1 Audio Layer III) (.mp3)</option>
                    <option value="ogg">Ogg Vorbis (.ogg)</option>
                    </select>
                    <div id="controls">
                        <button id="recordButton">Record</button>
                        <button id="stopButton" disabled>Stop</button>
                    </div>
                    <div id="formats"></div>
                    <pre>Log</pre>
                    <pre id="log"></pre>

                    <pre>Recordings</pre>
                    <ol id="recordingsList"></ol>
                </div>
            </div>
        )
    }
}
