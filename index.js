const search_btn=document.querySelector('.search-btn');
const inputField=document.querySelector('.search-recepie');
const menuItems=document.querySelector('.menu-items');
const Recepiebtn=document.querySelector('.menu-btn');
const header=document.querySelector('.item-heading');
const recepie_popup=document.querySelector('.recepie-detail');
const recepieClose=document.querySelector('.recepie-close-btn');
const recepiecontent=document.querySelector('.recepie-detail-content')
const img=document.querySelector('.img');

let json_data;

search_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    const key=inputField.value.toString().trim();
    inputField.style.fontSize=`15px`;
    inputField.value=""
    inputField.placeholder="try something new"
    header.textContent="Fetching data..."
    api_calling(key);

    // to remove the element
    img.remove()

    
    // json_data?.meals?.forEach((element,i)=>{
    // })

    
})

recepieClose.addEventListener('click',()=>{
    recepie_popup.style.display="none"
})

async function api_calling(key){
    
    const data=await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+key);
    json_data=await data.json();
    
    
    console.log(json_data);
    
    console.log(typeof(data.status));
    
    if(json_data.meals===null){
        header.textContent="No match found Try something Else";
        menuItems.innerHTML="enter only food related items"
    }
    else {

        header.innerHTML="Available Recepies are";
        json_data.meals.forEach((element,i)=> {
            let{strMealThumb,strMeal}=element;
            const html=`
            <div class="menu-container">
                <img src=${strMealThumb} alt="abc" class="menu-img" loading="lazy">
                <div class="menu-name">${strMeal}</div>
                <div class="menu-btn-cont">
                    <button class="menu-btn" onclick=runit(${i})>View Recepie</button>
                </div>
            </div>`
            menuItems.insertAdjacentHTML("afterbegin",html)
        });
    
    }

    // strMealThumb=strMeal="";
}

const getvalues=(selected_item)=>{
    let ingList="";
    for(let i=1;i<=20;i++){
        const prop=`strIngredient${i}`;
        const ing=selected_item[prop];
        if(ing){
            const measure=selected_item[`strMeasure${i}`]
            ingList+=`<li> ${measure} ${ing} </li>`
        }
        console.log(ingList);
        
    }
    return ingList;
}


const runit=(i)=>{
    const selected_item=json_data.meals[i]
    console.log();
    
    console.log(selected_item);
    const { strMeal, strInstructions,strCategory,strMealThumb } = selected_item;
    
    recepiecontent.innerHTML=`
        <h2 class="fir">${strMeal}</h2>
        <h6 class="category">${strCategory} </h6><br>
        <h5>Ingredient</h5>
        <ul class="ingre">
            ${getvalues(selected_item)}
        </ul>
       
        <h5>Instructions</h5>
        <p class="ins">${strInstructions}</p>
        <img src="${strMealThumb}" class="sml-img">
        `
        
    recepiecontent.parentElement.style.display='block'
    
}
