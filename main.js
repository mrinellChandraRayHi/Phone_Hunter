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
                      <div class="card-actions justify-center">
                        <button onClick="handleShoeDetails('${phone.slug}')" class="btn btn-primary">Shoe Details</button>
                      </div>
                    </div>
        `
        // 04 append child
        phoneContainer.appendChild(phoneCard);
    });
    //===========hide loading spinner===========
    toggleLoadingSpinner(false);
}
// handle search recap
const handle_search=()=>{
    //=======================
    // toggleLoadingSpinner();
    toggleLoadingSpinner(true);
    //=======================
    const searchField=document.getElementById("search_field");
    const searchText=searchField.value;
    //console.log(searchText);
    // phone dekhabe.........
    loadPhone(searchText);
}

//==============
const toggleLoadingSpinner=(isLoading)=>{
    const loadingSpinner=document.getElementById('loading_spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShoeDetails=async(id)=>{
    //console.log('object', id);
    const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const datas=await res.json();
    // console.log(datas);
    const phone=datas.data;
    showPhoneDetails(phone);
}

const showPhoneDetails=(phone)=>{
    console.log(phone);
    const phoneName=document.getElementById('phoneName');
    //console.log(phoneName);
    phoneName.innerHTML=phone.name;
    const showDetailsContainer=document.getElementById('show_details_container');
    showDetailsContainer.innerHTML=`
    <img src=${phone.image}>
    <p>${phone.brand}</p>
    <p>${phone.mainFeatures.displaySize}</p>
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    `
    show_details_modal.showModal();
}










// loadPhone();