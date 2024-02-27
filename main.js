const loadPhone=async(searchText)=>{
    try{
        const res=await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
        const datas = await res.json();
        const phones=datas.data;
        //console.log(phones);
        displayPhones(phones);
    }
    catch{
        console.log('not found');
    }
}



const displayPhones=phones=>{
    //console.log(phones);
    const phoneContainer=document.getElementById('phone_container');
    /*==========================================================
    ==============clear phone container card before add=========
    ============================================================
    */
   phoneContainer.textContent='';
   //================show and hide button====================
   const showAllContainer=document.getElementById("show_all_container");
   if(phones.length>12){
    showAllContainer.classList.remove('hidden');
   }else{
    showAllContainer.classList.add('hidden');
   }
   //===========display only first 12 phones====================
   phones=phones.slice(0,12);
   //====================================================
    phones.forEach(phone => {
        //console.log(phone);
        // 01 create a div
        const phoneCard=document.createElement('div');
        // 02 create a div
        phoneCard.classList=`card w-96 bg-gray-100 shadow-xl`;
        // 03 set inner html
        phoneCard.innerHTML=`
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
        `
        // 04 append child
        phoneContainer.appendChild(phoneCard);
    });
}

const handle_search=()=>{
    const searchField=document.getElementById("search_field");
    const searchText=searchField.value;
    //console.log(searchText);
    // phone dekhabe.........
    loadPhone(searchText);
}













// loadPhone();