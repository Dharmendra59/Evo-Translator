

const fromText = document.querySelector("#fromText");
const toText = document.querySelector("#toText");
const fselect = document.querySelector("#fselect");
const sselect = document.querySelector("#sselect");
const convert = document.querySelector("#convert");
const mic = document.querySelector("#mic");
const speaker1 = document.querySelector("#speaker1");
const speaker2 = document.querySelector("#speaker2");
const copy = document.querySelector("#copy");
const text = document.querySelector(".text");
const selectList = document.querySelectorAll("select");


convert.addEventListener("click", () => {
      let text = fselect.value;
      fselect.value = sselect.value;
      sselect.value = text;
})
      
              
fromText.addEventListener("input", () => {
      let text = fromText.value;
      let from = fselect.value;
      let to = sselect.value;
      fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`)
            .then(res => res.json())
            .then(data => {
                  toText.value = data.responseData.translatedText                   
            })  
})


selectList.forEach((get, con) => {
      for(let countyCode in lang){
            let option = `<option value="${countyCode}">${lang[countyCode]}</option>`
           
            get.insertAdjacentHTML("beforeend", option)
      }
})

mic.addEventListener("click", () => {
      navigator.mediaDevices.getUserMedia({audio: true})
            .then(stream => {
                  let recorder = new MediaRecorder(stream);
                  recorder.start();
                  recorder.ondataavailable = (e) => {
                        let blob = e.data;
                        let audioURL = URL.createObjectURL(blob);
                        let audio = new Audio(audioURL);
                        audio.play();
                        stream.getAudioTracks()[0].stop();
                  }

            })
            .catch(err => {
                  console.log(err)
            })

})

speaker1.addEventListener("click", () => {
      let utterance = new SpeechSynthesisUtterance(fromText.value);
      speechSynthesis.speak(utterance);
})

speaker2.addEventListener("click", () => {
      let utterance = new SpeechSynthesisUtterance(toText.value);
      speechSynthesis.speak(utterance);
})

copy.addEventListener("click", () => {
      navigator.clipboard.writeText(toText.value);
      alert("Text Copied")
})