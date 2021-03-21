// Unique User Cookie - 365 days 
if(Cookies.get('frmrUsrUUID') == undefined) {
    Cookies.set('frmrUsrUUID', uuidv4(), { expires: 365, secure: true });
}
console.log('Unique user id: ', Cookies.get('frmrUsrUUID'));

// Session Cookie - 1 hour
if(Cookies.get('frmrSessionUUID') == undefined) {
    Cookies.set('frmrSessionUUID', uuidv4(), { expires: 0.04, secure: true });
}
console.log('Session id: ', Cookies.get('frmrSessionUUID'));

const events = ['mouseenter', 'click'];

const sendRequest = (elem, event) => {
    const attrs = elem.attributes;
    let label = [...elem.form.querySelectorAll('label')].filter(
        (l) => l.attributes.for.value == attrs.id.value);
    const formrObj = {
        form: {
            formrId : elem.form.dataset.formrIdm,
            id : elem.form.attributes.id ? elem.form.attributes.id.value : null,
            name : elem.form.attributes.name ? elem.form.attributes.name.value : null,
        },
        source: {
            origin : window.location.origin,
            path : window.location.pathname,
        },
        label: label.length ? label[0].innerText: null,
        userId : Cookies.get('frmrUsrUUID'),
        sessionId : Cookies.get('frmrSessionUUID'),
        type : attrs.type ? attrs.type.value : null,
        htmlId : attrs.id ? attrs.id.value : null,
        placeholder : attrs.placeholder ? attrs.placeholder.value : null,
        name : attrs.name ? attrs.name.value : null,
        event : event.type,
        timestamp : Date.now(),
    };

    console.log(formrObj);
}

const callbacks = (elem) => {
    events.forEach((e) => {
        elem.addEventListener(e, (event) => {
            sendRequest(elem, event);
        })
    })
}


let forms = document.querySelectorAll('form');

forms.forEach((form) => {
    form.dataset.formrId = uuidv4();
    let inputs = form.querySelectorAll('input, textarea');
    inputs.forEach((field) => {
        field.dataset.formrId = uuidv4();
        callbacks(field);
    });
    let selects = form.querySelectorAll('select');
    selects.forEach((select) => {
        select.dataset.formrId = uuidv4();
        callbacks(select);
        let options = select.querySelectorAll('option');
        options.forEach((option) => {
            option.dataset.formrId = uuidv4();
            callbacks(option);
        })
    })
})
