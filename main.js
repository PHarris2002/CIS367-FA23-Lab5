
const API_URL = "https://fhu-faculty-api.netlify.app/fhu-faculty.json"

const data = [];

const carousel = document.getElementsByClassName("carousel")[0];
var activeIndex = Math.floor(data.length/2);


async function addCards() {
    
    let response = await fetch(API_URL);
    let people = await response.json();


    people.forEach(person => {
        let div = document.createElement('div');
        //div.classList.add("box");
    
        let cardInnerHTML =
        `<section class="box active flex flex-col">
        <section class="card-border w-[24rem] m-auto p-2 bg-gradient-to-b from-gray-400 to-gray-700 font-spacegrotesk text-white rounded-2xl">
            <section class="full-container flex flex-col bg-gradient-to-b from-indigo-950 to-slate-900 rounded-2xl">
                <section class="upper-field-section pb-4 pr-4 font-pixelify h-42">
                    <h2 id="teaching-level" class="w-52 p-1 mb-2 bg-gradient-to-b from-gray-400 to-slate-600 rounded-br-lg text-lg">
                        ${person.Rank}
                    </h2>
                    <div class="info-subsection flex justify-between items-center mx-4">
                        <div class="flex items-end">
                            <h1 id="name" class="w-2/4 text-2xl">${person.FirstName} ${person.LastName}</h1>
                            <h1 id="fantasy-class" class="text-md text-emerald-200 ml-2">${person.Type}</h1>
                        </div>
            
                        <div class="text-end">
                            <h1 id="health-points" class="text-3xl"><span class="text-sm">HP</span> <span class="font-spacegrotesk font-bold text-emerald-200">${person.HitPoints}</span></h1>
                            <h2 id="field" class="text-sm">${person.FieldofStudy}</h2>
                        </div>
                    </div>
                </section>
            
                <section class="image-section flex justify-center">
                    <div class="character-image relative w-[19rem] h-60 flex justify-center bg-gradient-to-b border-2">
                        <img src="https://fhu-faculty-api.netlify.app/images/headshots/${person.Image}" alt="${person.FirstName} ${person.LastName}" class="object-cover w-full">
                        <p class="absolute flex left-0 bg-gradient-to-b from-gray-400 to-slate-600 p-2 h-5 justify-center items-center font-pixelify text-xl">${person.EducationLevel}</p>
                        <img>
                    </div>
                </section>
                
                <section class="under-image-detail-section flex justify-around mx-8 px-3 mb-5 bg-gradient-to-b from-gray-400 to-slate-600">
                    <p id="character-id">#${person.id}</p>
                    <p id="nickname">${person.NickName}</p>
                    <p id="height">HT: ${person.Height}</p>
                </section>
                <section class="bottom-portion-of-card-section mb-5 mx-8 bg-gradient-to-b from-indigo-900 to-indigo-950 rounded-lg">
                    <section class="cost-stamina-section flex p-2 justify-between bg-gradient-to-b from-gray-400 to-slate-600 text-md">
                        <h2 id="cost">Cost: ${person.Cost}</h2>
                        <h2 id="stamina">Stamina: ${person.Stamina}</h2>
                    </section>
            
            
                    <section class="attacks-section p-5">
                        <div id="attack-one" class="flex flex-row justify-between mb-5">
                            <h1 id="attack-one-label" class="text-sm font-bold">${person.Attack1}</h1>
                            <h1 id="attack-one-points" class="font-bold text-emerald-200 text-xl">${person.Attack1Damage}</h1>  
                        </div>
                        <div id="attack-two" class="flex justify-between">
                            <h1 id="attack-two-label" class="text-sm font-bold">${person.Attack2}</h1>
                            <h1 id="attack-two-points" class="font-bold text-emerald-200 text-xl">${person.Attack2Damage}</h1>
                        </div>
                    </section>
            
                    <section class="resistances-weaknesses-section flex px-3 mb-5 text-xs">
                        <div class="w-1/2">
                            <h3 class="font-bold text-emerald-200">Resistances</h3>
                            <p>${person.Resistances}</p>
                        </div>
                        <div class="w-1/2 self-center">
                            <h3 class="font-bold text-emerald-200">Weaknesses</h3>
                            <p>${person.Weaknesses}</p>
                        </div>
                    </section>
                </section>
            
                <section class="attributes-section flex items-end mb-2 mx-8">
                    <p class="w-1/4 text-left">@2023</p>
                    <p class="w-2/4 text-center break-words">${person.HashTag}</p>
                    <p class="w-1/4 text-right">${person.Creator}</p>
                </section>
            </section>
        </section>
        <section class="media-sharing-section mx-auto w-[20rem]">
            <section class="flex flex-row justify-around mx-10 py-5 text-6xl">
                <div onclick="bookmarkToggle(this)" class="bookmark ${person.FirstName}-${person.LastName} fa-regular fa-bookmark cursor-pointer btn"></div>
                <div class="download fa-regular fa-circle-down cursor-pointer btn"></div>
                <div onclick="likeToggle(this)" class="heart fa-regular fa-heart cursor-pointer btn"></div>
            </section>
        </section>
        </section>`

        
        div.innerHTML = cardInnerHTML;
    
        //div.innerHTML = `${person.FirstName} ${person.LastName}`
        data.push(`${person.FirstName}-${person.LastName}`)
    
        carousel.appendChild(div);
    });
}

addCards();
updateCards();

function updateCards() {

    var windowWidth = window.innerWidth;
    console.log(windowWidth);
    var cardWidth = 350;
    const length = data.length;

    const boxes = document.querySelectorAll(".carousel .box");
    
    boxes.forEach( (div, index) => {
      
        //let div = document.createElement('div');
        //div.classList.add("box");
    
        if( index < activeIndex){
            //div.classList.add("left");
            div.classList.remove("active");
            //const offset = windowWidth/2 - cardWidth/2 - index * 10;
            // div.style.transform = `translateX(${-offset}px)`;
            
            div.style.zIndex = index;
            const offset = 100+(length-index)*2;
            div.style.transform = `translateX(-${offset}%) scale(100%)`;
           
            // div.style.left = `${index*8}px`
            //div.style.transform+=` scale(${ Math.pow(0.9, length-index+1)})`;
        }
        else if(index === activeIndex)
        {
            div.classList.add("active");
            div.style.zIndex = 300;
            div.style.transform = `translateX(0) scale(120%)`;

        }
        else {
            //div.classList.add("right");
            div.classList.remove("active");
            // const offset = windowWidth/2 - cardWidth/2 - (length - index+1) * 10;
            // console.log(offset)
            // div.style.transform = `translateX(${offset}px)`;
            div.style.zIndex = (length - index);
            const offset = 100+(index)*2;

            div.style.transform = `translateX(${offset}%) scale(100%)`;

            // div.style.right = `${ (length-index)*8}px`
            //div.style.right  = `${offset}px`
        }
    });

}

window.addEventListener("resize", updateCards);


document.getElementById("prevButton").addEventListener("click", ()=>{
    if( activeIndex >= 0)
    {
        activeIndex--;
        updateCards();
    }
    
});

document.getElementById("nextButton").addEventListener("click", ()=>{
    if( activeIndex < data.length)
    {
        activeIndex++;
        updateCards();
    }
    
});