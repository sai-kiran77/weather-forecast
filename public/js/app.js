// fetch("http://localhost:3000/weather?search=anantapur").then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weather_form = document.querySelector("form") //select's the elements in html

const search =document.querySelector("input") 
const messageOne = document.querySelector(".message_one")
const messageTwo =document.querySelector(".message_two")

weather_form.addEventListener("submit",(event)=>{
    event.preventDefault() //preventing the page from refresh to a new page

    //console.log(search.value)
    const location = search.value
    messageOne.textContent="Loading..."
    messageTwo.textContent=""

    fetch("http://localhost:3000/weather?search="+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent=data.error
        }else{
            messageOne.textContent=data.weather_Report
            messageTwo.textContent=data.address
        }
    })
})

    
})