window.onload = () => {

    const paramsString = document.location.search;
    const searchParams = new URLSearchParams(paramsString);


    for (const param of searchParams) {

        console.log(param);

        const elementId = param[0];
        const elementValue = param[1];
        const element = document.getElementById(elementId);


        if (element !== null) {
            element.textContent = elementValue;
        }


        if (elementId === "address") {

            const addressValue = elementValue;
            element.href = `https://www.google.com/maps/search/?api=1&query=${addressValue}`;
            element.textContent = addressValue;
        }

        else if (elementId === "email") {

            const emailValue = elementValue;
            element.href = `mailto:${emailValue}?subject=Hello!&body=What's up?`;
            element.textContent = emailValue;
        }
    }
};