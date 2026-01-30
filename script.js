let imgs_clic, img_popup, cache_fenetre;
let codeDuBloc = "<section><img src='images/coin_section.svg' class='coin coinG'/><h2 id='{{titre}}'>{{titre}}</h2><div class='bloc-img'><img src='images/{{titre}}.jpg' alt='{{description}}' class='image-cliquable'><p class ='paragraphe'>{{texte}}</p></div><img src='images/coin_section.svg' class='coin coinD'/></section>";

document.addEventListener("DOMContentLoaded", function () {

    console.log("hello");

    fetch('images.json').then(function (response) {
        response.json().then(function (data) {

            console.log(data);

            // MODIF CODE HTML           

            data.forEach(function (img) {

                console.log(img['titre']);

                document.querySelector(".liste-images").innerHTML += codeDuBloc.replaceAll("{{titre}}", img['titre']).replace("{{description}}", img['description']).replace("{{texte}}", img['texte']);

                console.log('Image: ', img['titre']);
            })

            // POPUP

            imgs_clic = document.querySelectorAll('.image-cliquable');

            const fenetre_modale = document.querySelector('.popup');
            img_popup = document.querySelector('.popup img');
            console.log("nnn", imgs_clic);
            cache_fenetre = document.querySelector('.cache-fenêtre');

            imgs_clic.forEach(function (img_clic) {
                img_clic.addEventListener('click', function (e) {
                    console.log(e.target);

                    img_popup.setAttribute('src', e.target.getAttribute('src'));

                    fenetre_modale.classList.remove("popup-invisible");
                    fenetre_modale.classList.add("popup-visible");

                    cache_fenetre.addEventListener('click', function () {
                        fenetre_modale.classList.remove("popup-visible");
                        fenetre_modale.classList.add("popup-invisible");
                    })
                })
            })
        })
    })

    // POPUP MENTIONS LEGALES

    const mentions_legales = document.querySelector("footer p");
    const modale_mentions = document.querySelector(".popup_mentions_légales");
    const cache_fenetre_mentions = document.querySelector(".cache-fenêtre-mentions");

    mentions_legales.addEventListener('click', function (e) {
        console.log('test');
        modale_mentions.classList.remove("popup-invisible");
        modale_mentions.classList.add("popup-visible");

        cache_fenetre_mentions.addEventListener('click', function () {
            modale_mentions.classList.remove("popup-visible");
            modale_mentions.classList.add("popup-invisible");
        })

    })

    // Formulaire

    const input_titre = document.querySelector("input[id=titre]");
    const input_description = document.querySelector("input[id=description]");
    const input_url = document.querySelector("input[id=url]");
    const input_submit = document.querySelector("input[type=button]");
    const message_erreur = document.querySelector(".message_erreur");

    input_titre.addEventListener('keyup', function () {
        console.log(input_titre.value);
    })

    input_submit.addEventListener('click', function () {
        console.log("OK");

        // MESSAGE ERREUR

        message_erreur.textContent = "";
        message_erreur.style.color="red";
        if (input_titre.value.trim() === "" || input_description.value.trim() === "" || input_url.value.trim() === "") {
            message_erreur.textContent += "Les champs suivants sont manquants: ";
            console.log("AAA");

            if (input_titre.value.trim() === "") {
                message_erreur.textContent += "Titre ";
            }
            if (input_description.value.trim() === "") {
                message_erreur.textContent += "Description  ";
            }
            if (input_url.value.trim() === "") {
                message_erreur.textContent += "URL ";
            }
            return;
        }

        const message = "Je propose d'ajouter l'image avec les caractéristiques suivantes: Titre: " + input_titre.value +
            ", Description:" + input_description.value +
            "URL: " + input_url.value;
        const urlVisitee = "https://gambette.butmmi.o2switch.site/api.php?format=json&login=mauclert&email=philippe.gambette@univ-eiffel.fr&message=" + encodeURIComponent(message);
        console.log(urlVisitee);

        // ENVOI à l'API

        fetch(urlVisitee).then(function (response) {
            console.log("URL VISITEE");
            response.json().then(function (data) {

                console.log("Réponse reçue : ");
                console.log(data);

                if (data.status === "success") {

                    codeDuBloc = "<section><h2>{{titre}}</h2><div class='bloc-img'><img src='{{url}}' alt='{{description}}' class='image-cliquable'></div></section>";

                    document.querySelector(".liste-images").innerHTML += codeDuBloc.replaceAll("{{titre}}", input_titre.value).replace("{{description}}", input_description.value).replace("{{url}}", input_url.value);
                    console.log(data);
                    message_erreur.textContent = "Votre réponse a bien été prise en compte.";
                    message_erreur.style.color = "green";
                }
                else {
                    message_erreur.textContent = "Oups ! Votre réponse n'a pas pu être envoyé.";
                }
            })
        })


    })

})

