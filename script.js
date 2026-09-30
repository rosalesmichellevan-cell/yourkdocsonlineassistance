// =====================================================
// KDocs Online Services
// Website Form → Google Apps Script → Google Drive
// =====================================================

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwjdZYHdFs08oXt4_1vlnrFGEChtSW7B4nXRU_jT7Gv_knG_oyhloq1sVvfyQmeSgTI/exec";


// =====================================================
// MOBILE MENU
// =====================================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll("#nav-links a").forEach(function (link) {

        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
        });

    });
}


// =====================================================
// APPLICATION FORM
// =====================================================

const applicationForm =
    document.getElementById("applicationForm");

const formMessage =
    document.getElementById("form-message");


if (applicationForm) {

    applicationForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        // ---------------------------------------------
        // SHOW LOADING MESSAGE
        // ---------------------------------------------

        if (formMessage) {

            formMessage.textContent =
                "Please wait... Your application is being submitted.";

            formMessage.style.color = "#e75480";
        }


        const submitButton =
            applicationForm.querySelector(".submit-btn");


        if (submitButton) {

            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";

        }


        try {

            // -----------------------------------------
            // GET FORM VALUES
            // -----------------------------------------

            const formData =
                new FormData(applicationForm);


            // -----------------------------------------
            // GET UPLOADED FILES
            // -----------------------------------------

            const validIdInput =
                document.getElementById("valid_id");

            const selfieIdInput =
                document.getElementById("selfie_id");

            const psaDocumentInput =
                document.getElementById("psa_document");


            const validIdFile =
                validIdInput && validIdInput.files.length
                    ? validIdInput.files[0]
                    : null;


            const selfieIdFile =
                selfieIdInput && selfieIdInput.files.length
                    ? selfieIdInput.files[0]
                    : null;


            const psaDocumentFile =
                psaDocumentInput && psaDocumentInput.files.length
                    ? psaDocumentInput.files[0]
                    : null;


            // -----------------------------------------
            // CHECK REQUIRED FILES
            // -----------------------------------------

            if (!validIdFile) {

                throw new Error(
                    "Please upload your Valid ID."
                );

            }


            if (!selfieIdFile) {

                throw new Error(
                    "Please upload your selfie holding the same ID."
                );

            }


            if (!psaDocumentFile) {

                throw new Error(
                    "Please upload your PSA Document."
                );

            }


            // -----------------------------------------
            // ALLOWED FILE TYPES
            // -----------------------------------------

            const allowedTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png"
            ];


            // -----------------------------------------
            // CHECK VALID ID TYPE
            // -----------------------------------------

            if (!allowedTypes.includes(validIdFile.type)) {

                throw new Error(
                    "Valid ID must be JPG, JPEG, or PNG."
                );

            }


            // -----------------------------------------
            // CHECK SELFIE TYPE
            // -----------------------------------------

            if (!allowedTypes.includes(selfieIdFile.type)) {

                throw new Error(
                    "Selfie must be JPG, JPEG, or PNG."
                );

            }


            // -----------------------------------------
            // CHECK PSA TYPE
            // -----------------------------------------

            if (!allowedTypes.includes(psaDocumentFile.type)) {

                throw new Error(
                    "PSA Document must be JPG, JPEG, or PNG."
                );

            }


            // -----------------------------------------
            // MAX FILE SIZE
            // -----------------------------------------

            const maxFileSize =
                10 * 1024 * 1024; // 10 MB


            // -----------------------------------------
            // CHECK VALID ID SIZE
            // -----------------------------------------

            if (validIdFile.size > maxFileSize) {

                throw new Error(
                    "Your Valid ID image is too large. Please use an image smaller than 10 MB."
                );

            }


            // -----------------------------------------
            // CHECK SELFIE SIZE
            // -----------------------------------------

            if (selfieIdFile.size > maxFileSize) {

                throw new Error(
                    "Your selfie image is too large. Please use an image smaller than 10 MB."
                );

            }


            // -----------------------------------------
            // CHECK PSA SIZE
            // -----------------------------------------

            if (psaDocumentFile.size > maxFileSize) {

                throw new Error(
                    "Your PSA Document is too large. Please use an image smaller than 10 MB."
                );

            }


            // -----------------------------------------
            // READ FILES
            // -----------------------------------------

            const validId =
                await fileToBase64(validIdFile);


            const selfieId =
                await fileToBase64(selfieIdFile);


            const psaDocument =
                await fileToBase64(psaDocumentFile);


            // -----------------------------------------
            // CREATE DATA TO SEND
            // -----------------------------------------

            const data = {

                // -------------------------------------
                // PERSONAL INFORMATION
                // -------------------------------------

                first_name:
                    formData.get("first_name") || "",

                middle_name:
                    formData.get("middle_name") || "",

                last_name:
                    formData.get("last_name") || "",

                suffix:
                    formData.get("suffix") || "",

                date_of_birth:
                    formData.get("date_of_birth") || "",

                civil_status:
                    formData.get("civil_status") || "",

                gender:
                    formData.get("gender") || "",

                weight:
                    formData.get("weight") || "",

                height:
                    formData.get("height") || "",

                religion:
                    formData.get("religion") || "",

                facebook_account:
                    formData.get("facebook_account") || "",

                birthplace:
                    formData.get("birthplace") || "",

                mother_maiden_name:
                    formData.get("mother_maiden_name") || "",

                father_full_name:
                    formData.get("father_full_name") || "",


                // -------------------------------------
                // CONTACT INFORMATION
                // -------------------------------------

                email:
                    formData.get("email") || "",

                contact_number:
                    formData.get("contact_number") || "",


                // -------------------------------------
                // ADDRESS
                // -------------------------------------

                province:
                    formData.get("province") || "",

                municipality_city:
                    formData.get("municipality_city") || "",

                barangay:
                    formData.get("barangay") || "",

                zip_code:
                    formData.get("zip_code") || "",


                // -------------------------------------
                // CONSENT
                // -------------------------------------

                consent:
                    formData.get("consent") || "",


                // -------------------------------------
                // VALID ID
                // -------------------------------------

                valid_id: {

                    name:
                        validIdFile.name,

                    type:
                        validIdFile.type,

                    data:
                        validId

                },


                // -------------------------------------
                // SELFIE WITH VALID ID
                // -------------------------------------

                selfie_id: {

                    name:
                        selfieIdFile.name,

                    type:
                        selfieIdFile.type,

                    data:
                        selfieId

                },


                // -------------------------------------
                // PSA DOCUMENT
                // -------------------------------------

                psa_document: {

                    name:
                        psaDocumentFile.name,

                    type:
                        psaDocumentFile.type,

                    data:
                        psaDocument

                }

            };


            // -----------------------------------------
            // SEND TO GOOGLE APPS SCRIPT
            // -----------------------------------------

            await fetch(
                GOOGLE_SCRIPT_URL,
                {
                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type": "text/plain;charset=utf-8"
                    },

                    body: JSON.stringify(data)
                }
            );


            // -----------------------------------------
            // SUCCESS MESSAGE
            // -----------------------------------------

            if (formMessage) {

                formMessage.textContent =
                    "Your application has been submitted. Thank you!";

                formMessage.style.color = "#198754";

            }


            // -----------------------------------------
            // CLEAR FORM
            // -----------------------------------------

            applicationForm.reset();


            // -----------------------------------------
            // SCROLL TO MESSAGE
            // -----------------------------------------

            if (formMessage) {

                formMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }


        } catch (error) {

            console.error(error);


            // -----------------------------------------
            // ERROR MESSAGE
            // -----------------------------------------

            if (formMessage) {

                formMessage.textContent =
                    error.message ||
                    "Something went wrong. Please try again.";

                formMessage.style.color = "#dc3545";

            }

        } finally {

            // -----------------------------------------
            // ENABLE BUTTON AGAIN
            // -----------------------------------------

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Submit Application";

            }

        }

    });

}


// =====================================================
// FILE → BASE64
// =====================================================

function fileToBase64(file) {

    return new Promise(function (resolve, reject) {

        const reader =
            new FileReader();


        reader.onload = function () {

            resolve(reader.result);

        };


        reader.onerror = function () {

            reject(
                new Error(
                    "Unable to read the uploaded file."
                )
            );

        };


        reader.readAsDataURL(file);

    });

}