// // function ajouterJoueur(){
// //     const form = document.querySelector(".formAjout");
// //     const nom = form.querySelector("#nom");
// //     console.log(form);
// //     console.log(nom);
// // }
// const btnSubmit = document.querySelector("button[type='submit']")
// btnSubmit.addEventListener("submit", function(e){
//     e.preventDefault();
//     const form = document.querySelector(".formAjout");
//     // const nom = form.querySelector("#nom");
//     // // if (nom.textContent){
//     //     console.log(nom.textContent);
//     // }
//     const nom = form.querySelector("#nom");
//     const numero = form.querySelector("#numero");
//     // const nom = form.querySelector("#nom");
//     console.log(nom);
//     console.log(numero);
// })
// // console.log(ajouterJoueur())

document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('.formAjout');
    const inputNom = document.getElementById('nom');
    const inputNum = document.getElementById('numero');
    const inputRadio = document.querySelectorAll("input[name='poste']");
    const dialog = document.getElementById('dialogAjout');

    if (!form) return;

    form .addEventListener('submit', (e)=>{
        e.preventDefault();
        let nomValid = true;
        let numValid = true;
        let radioValid = false;

        const valueNom = inputNom.value.trim();
        if (valueNom === '' || valueNom.length < 2){
            nomValid = false;
            console.error(inputNom, valueNom, 'Le nom complet doit contenir au moins 2 caractères.');
        } else {
            console.error(inputNom, 'Le nom complet est valid.');
        }
        console.log("nomValid : ", nomValid);

        const valueNum = inputNum.value.trim();
        if (valueNum === '' || valueNum < 1 || valueNum > 99){
            numValid = false;
            console.error(inputNum, valueNum, 'Le numéro doit être entre 1 et 99.');
        } else {
            console.error(inputNum, 'Le numéro est valid.');
        }
        console.log("numValid : ", numValid);

        let checkedRadio = "";
        // const valueRadio = inputRadio.value.trim();
        // for (i=0; i<inputRadio.length; i++){
        //     if(!inputRadio[i].checked){
        //         radioValid = false;
        //     } else if (inputRadio[i].checked){
        //         radioValid = true;
        //         checkedRadio = inputRadio[i].value;
        //     }
        // } 
        // if (radioValid = false){
        //     console.error("No radio is checked.");
        // } else if (radioValid = true){
        
        // }
        // if (!inputRadio){
        //     radioValid = false;
        //     console.error("No radio is checked.");
        // } else {
        for (i=0; i<inputRadio.length ; i++){
            if(inputRadio[i].checked){
                checkedRadio = inputRadio[i].value;
                radioValid = true;
            }
        }
        if (checkedRadio == ""){
            radioValid = false;
            console.error("No radio is checked.");
        }
        // }
        console.error("checkedRadio", checkedRadio);
        console.log("radioValid : ", radioValid);
})})
