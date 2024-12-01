const episodeElement = document.getElementById("current-Episode-Container")
const episodeTitle = document.getElementById("title")
const episodeDescription = document.getElementById("discription")
const episodeNumElement = document.getElementById("episode-Num")
const episodeTimeRanges = document.querySelectorAll(".time-Left-In-Episode");
const videoContainer = document.getElementById("video-Container")
var currentEpisode = null
var currentTimesLocal = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
var closedEpisode = true

var episodeNames = ["Cold Snap", "Storm of Fuck", "Smoke Signals", "H Is for Hero", "Runaway", "Too Many Tuna Sandwiches", 	"Skin of Her Teeth", "Unfair Game", "The Family Business", 	"Sins of the Father"]
var episodeDescriptions = [`Dexter is living a quiet life in the small town of Iron Lake, New York, under the alias "Jim Lindsay." He’s managed to suppress his urge to kill for nearly a decade while working at a local store and dating the town's police chief, Angela. However, when an arrogant local named Matt Caldwell provokes Dexter with his reckless behavior, Dexter's dark side resurfaces, and he ultimately kills Matt. Meanwhile, Dexter's estranged teenage son, Harrison, tracks him down, complicating his attempt to live a normal life. The episode ends with Dexter disposing of Matt’s body, marking his return to his violent ways.`, `Dexter scrambles to cover his tracks after killing Matt Caldwell, trying to hide any evidence of the murder. As the search for Matt intensifies, the local police, including his girlfriend Angela, become more involved, putting Dexter on edge. Dexter's son, Harrison, begins to settle into Iron Lake, though their relationship remains tense as Harrison confronts Dexter about abandoning him years ago. Meanwhile, Matt’s wealthy and powerful father, Kurt Caldwell, grows suspicious about his son’s disappearance. The episode ends with Dexter feeling the pressure of both the investigation and Harrison’s unexpected presence in his life.`, `Dexter scrambles to cover his tracks after killing Matt Caldwell and hiding his body. The police, including Dexter's girlfriend Angela, intensify their search for Matt, and Dexter becomes nervous as they get closer to discovering the truth. Meanwhile, Dexter tries to reconnect with his son Harrison, who enrolls at the local high school and quickly gains attention for his intelligence and mysterious past. Harrison bonds with a troubled student named Ethan, which raises concerns for Dexter. The episode ends with Dexter narrowly avoiding detection, but the pressure mounts as the investigation into Matt’s disappearance deepens.`, `Dexter grows more suspicious of his son, Harrison, after learning that Harrison stopped a potential school shooting by stabbing a fellow student in self-defense. The town views Harrison as a hero, but Dexter begins to question whether his son might have inherited his own dark tendencies. Meanwhile, Angela continues investigating the disappearance of several local women, leading her to an unsettling discovery. Dexter’s attempts to keep his old life hidden are challenged as Harrison starts to exhibit troubling behavior. The episode ends with Dexter fearing that Harrison might have a violent streak similar to his own.`, `Dexter tries to manage the escalating chaos in his life as he grows increasingly concerned about his son, Harrison. Harrison is struggling with anger issues, and after attacking a bully at school, Dexter begins to see signs of darkness in him. Meanwhile, Angela Bishop, the town's police chief and Dexter’s girlfriend, is investigating the disappearance of Matt Caldwell, and the search intensifies as Kurt Caldwell, Matt’s father, becomes more involved. Angela also uncovers a clue that could connect Dexter to his former life as a serial killer. The episode ends with Dexter realizing he may need to confront Harrison’s violent tendencies while also covering his tracks.`, `Angela's relationship with Dexter is strained after discovering it was built on a lie. Dexter finds out that Kurt is a serial killer. Angela finds her long lost friend's body in Clark Caves and calls Dexter for his crime scene analysis skills. Harrison's dark passenger is revealed again in a school wrestling match and Dexter doesn't know how to handle it.`, 	`Dexter and Angela find seemingly incriminating DNA evidence against Kurt linking him to Iris' murder. Angela arrests him, though Dexter's suspicions that it will not be enough to get him convicted later proves true. The DNA deterioration can only prove a familial match, and Kurt claims the DNA belongs to his father. One of Kurt's clients hands Harrison an envelope to deliver to Dexter, which contains a titanium screw. Dexter later deduces that it belonged to Matt, and that Kurt knows Dexter murdered him. Molly points to holes in Dexter's story when questioned by Angela. Harrison reveals that he remembers his mother's murder and decides to leave town. Dexter tries to follow but is attacked by Kurt's client.`, `Dexter escapes from his captor but is wounded and pursued through the snow. He later gains the upper hand and forces the man to confess Kurt's plans before killing him. Angela investigates and begins to suspect that Dexter murdered the drug dealer after connecting similar needle marks on the drug dealers. Kurt lures Harrison to his cabin where he intends to kill him in front of Dexter as soon as the latter arrives. However, he flees after Dexter attempts to run him over. Dexter opens up to Harrison about their shared dark passenger, and Harrison embraces him.`, `Angela has trouble processing the mounting evidence she finds against Dexter and learns that Molly is missing, while Dexter's bond with Harrison deepens as he reveals his code and ultimately that he murders those who prey on others. As father and son hunt together and discover Kurt's bunker filled with his "trophies" (including the recent addition of Molly), Kurt sets fire to Dexter's cabin hoping to flush him out and kill him. When he learns that Dexter and Harrison have discovered his bunker, he prepares to flee town but is caught by the duo. Harrison insists on staying to help and watch his father deal with Kurt and calls him a hero for saving thousands of lives, but the pooling blood reminds him of his mother's death. Now homeless, Dexter and Harrison are invited by Audrey to stay with a dubious Angela, who receives a posthumous letter from Kurt containing a titanium screw and a note that states Jim Lindsay murdered Matt.`, 	`Angela arrests Dexter for the murder of Matt Caldwell. When he rebuts all the evidence she brings forward against him, she contacts Batista, who is shocked to learn Dexter Morgan is still alive. Backed into a corner, Dexter tells Angela about Kurt's bunker and she abruptly leaves him in the care of Logan to investigate. Dexter breaks his code once again and kills Logan in order to escape from his cell and reunite with Harrison. Angela finds the bunker and calls for help, but is dismayed when Logan doesn't answer. Preparing to flee from town, Dexter gets into an argument with Harrison, who realizes that he killed Logan, an innocent man. They come to the conclusion that his code is flawed, that Harrison isn't like him, and that the only way for Harrison to be "normal" is for Dexter to die. He instructs Harrison to shoot him with the rifle to atone for his failures as a father and to set his son free. Dexter's inner monologue reveals that he feels love for the first time, before he is fatally shot. Angela arrives to the aftermath, gives Harrison some money and tells him to leave town and never return, as she prepares to take responsibility for Dexter's death. Harrison reads Dexter's final letter to Hannah before driving out of town.`]

console.log(episodeDescriptions[2])
var currentTimesServer = localStorage.getItem("currentTimes")
if(currentTimesServer != null) {
    currentTimesServer = currentTimesServer.split(",")
    currentTimesLocal = currentTimesServer
    console.log(currentTimesServer)
} else {
    currentTimesServer = currentTimesLocal
}

function openEpisode(episodeNum) {
    closedEpisode = false
    currentEpisode = episodeNum
    episodeElement.style.display = "flex"
    setTimeout(function() {
        episodeElement.style.transition = ".25s"
        episodeElement.style.opacity = "1"
    }, 500)
    video.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/afaithfulthreads.appspot.com/o/E" + episodeNum + ".mp4?alt=media&token=a8c3becb-9b03-4325-a2a9-2f8373a25ec6")
    episodeTitle.textContent = '"' + episodeNames[episodeNum - 1] + '"'
    episodeDescription.textContent = episodeDescriptions[episodeNum - 1]
    episodeNumElement.textContent = 'S1 E' + episodeNum
    
    setTimeout(function() {
        videoContainer.style.transition = ".25s"
        videoContainer.style.opacity = "1"
        seekBar.max = video.duration;
        videoDuration.textContent = formatVideoDuration(video.duration)
        videoDurationShow.textContent = formatDurationInMinutes(video.duration)    
        episodeElement.style.transition = "0s"
        if(currentTimesServer[episodeNum - 1] != 0) {
            video.currentTime = currentTimesServer[episodeNum - 1]
        }
        setTimeout(function() {
            videoContainer.style.transition = "0s"
            playVideo()
        }, 500)
    }, 2000)
}

function closeEpisode() {
    pauseVideo()
    unmuteVideo()
    closedEpisode = true
    episodeElement.style.transition = ".25s"
    episodeElement.style.opacity = "0"
    video.setAttribute("src", "")
    episodeTitle.textContent = ''
    episodeDescription.textContent = ''
    episodeNumElement.textContent = ''
    setTimeout(function() {    
        episodeElement.style.display = "none"
        episodeElement.style.transition = "0s"
        videoContainer.style.opacity = "0"
    }, 500)
}

function nextEpisode() {
    
}



// MAIN
episodeTimeRanges.forEach((timeRange, index) => {
    if(currentTimesServer != null) {
        timeRange.dataset.currentTime = currentTimesServer[index]
        if(currentTimesServer[index] != 0) {
            timeRange.style.background = "linear-gradient(to right, #ff0000 " + ((currentTimesServer[index] / (timeRange.dataset.duration * 60)) * 100) + "%, #ff0000 " + ((currentTimesServer[index] / (timeRange.dataset.duration * 60)) * 100) + "%, #ddd 0%, #ddd 100%)"
            console.log()
        }
    } else {
        console.log("Unwatched")
    }
});
