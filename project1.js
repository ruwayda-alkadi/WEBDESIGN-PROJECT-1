document.addEventListener("DOMContentLoaded", function () {

    const validationRules = {
        fullname: {
            minLength: 3
        },
        email: {
            mustContain: "@"
        }
    };

    const form = document.getElementById("contactForm");
    const fullName = document.getElementById("fullname");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const messageBox = document.getElementById("message");

    const maxChars = 200;

    const charCounter = document.createElement("p");

    charCounter.style.fontSize = "13px";
    charCounter.style.color = "#666666";

    messageBox.after(charCounter);

    charCounter.textContent = "الأحرف المتبقية : " + maxChars;

    messageBox.addEventListener("input", function () {

        let currentLength = messageBox.value.length;

        let remaining = maxChars - currentLength;

        charCounter.textContent = "الأحرف المتبقية : " + remaining;

        if (remaining < 20) {
            charCounter.style.color = "red";
        } else {
            charCounter.style.color = "#666666";
        }

    });

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        let fullNameValue = fullName.value.trim();
        let emailValue = email.value.trim();
        let phoneValue = phone.value.trim();

        let errors = [];

        if (
            fullNameValue == "" ||
            fullNameValue.length < validationRules.fullname.minLength
        ) {
            errors.push("الاسم يجب ألا يقل عن 3 أحرف.");
        }

        if (
            emailValue == "" ||
            !emailValue.includes(validationRules.email.mustContain)
        ) {
            errors.push("البريد الإلكتروني غير صحيح.");
        }

        let isPhoneValid = true;

        for (let i = 0; i < phoneValue.length; i++) {

            let currentChar = phoneValue[i];

            if (
                currentChar < "0" ||
                currentChar > "9"
            ) {
                isPhoneValid = false;
            }

        }

        if (
            phoneValue == "" ||
            !isPhoneValid
        ) {
            errors.push("رقم الهاتف يجب أن يحتوي على أرقام فقط.");
        }

        if (errors.length > 0) {

            alert(
                "يرجى تصحيح الأخطاء التالية:\n\n" +
                errors.join("\n")
            );

        } else {

            alert("تم إرسال النموذج بنجاح.");

            form.reset();

            charCounter.textContent = "الأحرف المتبقية : " + maxChars;

        }

    });

});