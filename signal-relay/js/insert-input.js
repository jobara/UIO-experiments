const insert = function (outputSelector, data) {
    const output = document.querySelector(outputSelector);
    const elm = document.createElement("li");

    // TODO: escape input using something like https://www.npmjs.com/package/html-entities
    elm.innerHTML = `
        <label>${data.label}:
            <input
                type="text"
                name="${data.name}"
                ${data.value !== "" ? `value="${data.value}"` : ""}
                ${data.observed ? `data-input-relay=""` : ""}
                ${data.path ? `data-input-relay-path="${data.path}"` : ""}
            >
        </label>
        <button class="remove" type="button"><span class="remove-label">Remove</span></button>
    `;

    output.append(elm);
};

const inputInserter = function (formSelector, options) {
    const opts = {
        outputSelector: ".insert-to",
        ...options
    }

    const form = document.querySelector(formSelector);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        event.stopPropagation();
        new FormData(form);
    });

    form.addEventListener("formdata", (event) => {
        const data = event.formData;
        insert(opts.outputSelector, Object.fromEntries(data.entries()));
    });
};
