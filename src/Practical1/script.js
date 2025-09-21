let vote = {
    Javascript: 0,
    Python: 0,
    Java: 0
};

function votes(language){
    vote[language]++;
    updatevotes();
}

function updatevotes(){
    document.getElementById("jsvotes").innerHTML = vote.Javascript;
    document.getElementById("pyvotes").innerHTML = vote.Python;
    document.getElementById("jvotes").innerHTML = vote.Java;
}

setInterval(()=> {
    const langs = Object.keys(vote);
    const randomVote = langs[Math.floor(Math.random()*langs.length)];
    vote[randomVote]++;
    updatevotes();
}, 2000);