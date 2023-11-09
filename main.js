const API_URL = "https://fhu-faculty-api.netlify.app/fhu-faculty.json"

const bookmarkCollection = document.getElementById("added-bookmarks")
const bookmarkCollectionBtn = document.getElementById("bookmark-collection-btn")
const bookmarkBtn = document.getElementsByClassName("bookmark")

const data = [];
const bookmarkList = [];

const carousel = document.getElementsByClassName("carousel")[0];
var activeIndex = Math.floor(data.length/2);


async function addCards() {
    
    let response = await fetch(API_URL);
    let people = await response.json();


    people.forEach(person => {
        let div = document.createElement('div');
        //div.classList.add("box");
    
        let cardInnerHTML =
        `<section class="box active flex items-start">
            <section class="card-border w-[18rem] m-auto p-2 bg-gradient-to-b from-gray-400 to-gray-700 font-spacegrotesk text-white rounded-2xl z-10">
                <section class="full-container h-[33rem] flex flex-col bg-gradient-to-b from-indigo-950 to-slate-900 rounded-2xl">
                    <section class="upper-field-section pb-2 pr-4 font-pixelify">
                        <h2 id="teaching-level" class="w-52 p-1 mb-2 bg-gradient-to-b from-gray-400 to-slate-600 rounded-br-lg text-sm">
                            ${person.Rank}
                        </h2>
                        <div class="info-subsection flex justify-between items-center mx-4">
                            <div class="flex items-end">
                                <h1 id="name" class="w-2/4 text-md">${person.FirstName} ${person.LastName}</h1>
                                <h1 id="fantasy-class" class="text-sm text-emerald-200 ml-2">${person.Type}</h1>
                            </div>
                
                            <div class="text-end">
                                <h1 id="health-points" class="text-3xl"><span class="text-xs">HP</span> <span class="font-spacegrotesk font-bold text-emerald-200 text-xl">${person.HitPoints}</span></h1>
                                <h2 id="field" class="text-xs">${person.FieldofStudy}</h2>
                            </div>
                        </div>
                    </section>
                
                    <section class="image-section flex justify-center">
                        <div class="character-image relative w-[10rem] h-[8rem] flex justify-center bg-gradient-to-b border-2">
                            <img src="https://fhu-faculty-api.netlify.app/images/headshots/${person.Image}" alt="${person.FirstName} ${person.LastName}" class="object-cover w-full">
                            <p class="absolute flex left-0 bg-gradient-to-b from-gray-400 to-slate-600 p-2 h-5 justify-center items-center font-pixelify text-sm">${person.EducationLevel}</p>
                            <img>
                        </div>
                    </section>
                    
                    <section class="under-image-detail-section flex justify-between mx-12 px-3 mb-5 bg-gradient-to-b from-gray-400 to-slate-600 text-xs">
                        <p id="character-id">#${person.id}</p>
                        <p id="nickname">${person.NickName}</p>
                        <p id="height">HT: ${person.Height}</p>
                    </section>
                    <section class="bottom-portion-of-card-section mb-5 mx-4 bg-gradient-to-b from-indigo-900 to-indigo-950 rounded-lg">
                        <section class="cost-stamina-section flex p-2 justify-between bg-gradient-to-b from-gray-400 to-slate-600 text-xs">
                            <h2 id="cost">Cost: ${person.Cost}</h2>
                            <h2 id="stamina">Stamina: ${person.Stamina}</h2>
                        </section>
                
                
                        <section class="attacks-section p-3">
                            <div id="attack-one" class="flex flex-row justify-between items-start mb-2">
                                <h1 id="attack-one-label" class="text-xs font-bold">${person.Attack1}</h1>
                                <h1 id="attack-one-points" class="font-bold text-emerald-200 text-lg">${person.Attack1Damage}</h1>  
                            </div>
                            <div id="attack-two" class="flex justify-between items-start">
                                <h1 id="attack-two-label" class="text-xs font-bold">${person.Attack2}</h1>
                                <h1 id="attack-two-points" class="font-bold text-emerald-200 text-lg">${person.Attack2Damage}</h1>
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
                
                    <section class="attributes-section flex items-end mx-8 text-xs">
                        <p class="w-1/4 text-left">@2023</p>
                        <p class="w-2/4 text-center break-words">${person.HashTag}</p>
                        <p class="w-1/4 text-right">${person.Creator}</p>
                    </section>
                </section>
            </section>
            <section id="media-section" class="w-[5rem] z-0">
                <section class="flex flex-col space-y-5 items-center justify-around text-6xl">
                    <div onclick="bookmarkToggle(this)" class="bookmark ${person.FirstName}-${person.LastName} fa-regular fa-bookmark cursor-pointer btn"></div>
                    <div class="download fa-regular fa-circle-down cursor-pointer btn"></div>
                    <div onclick="likeToggle(this)" class="heart fa-regular fa-heart cursor-pointer btn"></div>
                </section>
            </section>
        </section>`

        
        div.innerHTML = cardInnerHTML;
    
        //div.innerHTML = `${person.FirstName} ${person.LastName}`
        data.push(`${person.id}`)
        carousel.append(div);

        // For bookmark toggle functionality
        // Paragraph element for bookmark list
        bookmarkCollectionParagraph = document.createElement('p');

        // Hidden element for each name to defaultly disappear
        bookmarkCollectionParagraph.classList.add('hidden');

        facultyNameClass = `${person.FirstName}-${person.LastName}`

        // Adds identifier class for each name - uniquely identifies any duplicates
        if (bookmarkList.includes(`${facultyNameClass}`))
        {
            bookmarkCollectionParagraph.classList.add(`${facultyNameClass}-one`);        
            bookmarkList.push(`${facultyNameClass}-one`)
        }

        else if (bookmarkList.includes(`${facultyNameClass}-one`))
        {
            bookmarkCollectionParagraph.classList.add(`${facultyNameClass}-two`)
            bookmarkList.push(`${facultyNameClass}-two`)
        }

        else
        {
            bookmarkCollectionParagraph.classList.add(`${facultyNameClass}`);  
            bookmarkList.push(`${facultyNameClass}`)
        }

        // The text itself
        bookmarkCollectionParagraph.innerHTML = `${person.FirstName} ${person.LastName}`;

        bookmarkCollection.append(bookmarkCollectionParagraph);

        updateCards();

    });
}

addCards();

function updateCards() {
    const length = data.length;

    const boxes = document.querySelectorAll(".carousel .box");
    
    boxes.forEach( (div, index) => {
        if( index < activeIndex){
            // left
            div.classList.remove("active");
            // div.classList.remove("opacity-100");
            // div.classList.add("opacity-0");
            div.style.zIndex = index;
            const offset = 100;
            div.style.transform = `translateX(-${offset}%) scale(80%)`;
        }
        else if(index === activeIndex)
        {
            // middle
            div.classList.add("active");
            // div.classList.remove("opacity-0");
            // div.classList.add("opacity-100");
            div.style.zIndex = 300;
            div.style.transform = `translateX(0%) scale(100%)`;
        }
        else {
            //right
            div.classList.remove("active");
            // div.classList.remove("opacity-100");
            // div.classList.add("opacity-0");
            div.style.zIndex = (length - index);
            const offset = 100;
            div.style.transform = `translateX(${offset}%) scale(80%)`;
        }
    });
}

window.addEventListener("resize", updateCards);

carouselOffset = 20;
document.getElementById("prevButton").addEventListener("click", ()=>{
    if( activeIndex >= 0)
    {
        activeIndex--;
        carouselOffset = carouselOffset + 1.05;
        carousel.style.transform = `translateX(${carouselOffset}%)`;
        updateCards();
    }
    
});

document.getElementById("nextButton").addEventListener("click", ()=>{
    if( activeIndex < data.length)
    {
        activeIndex++;
        carouselOffset = carouselOffset - 1.05;
        carousel.style.transform = `translateX(${carouselOffset}%)`;
        updateCards();
    }
    
});

function likeToggle(x) {
    x.classList.toggle("fa-solid");
    x.classList.toggle("text-red-500")
  }

function bookmarkToggle(x) {
    x.classList.toggle("fa-solid");
    x.classList.toggle("text-amber-500");

    // Get specific name

    for (let i = 0; i < bookmarkList.length; i++)
    {
        let object = bookmarkList[i];
        if (x.classList.contains(object))
        {
            document.querySelector(`#added-bookmarks > p.${object}`).classList.toggle('hidden');
        }
    }

    //document.querySelector("#added-bookmarks > p").classList.toggle('hidden');

}

function bookmarkContainerSlide() {
    bookmarkCollection.classList.toggle("active-nav");
    console.log('yeah');
}