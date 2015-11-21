// javascript se izpolzva pridavane na dinamika na stranicata
// sus .value vzima stoinostta napoletata za da gi sloji v masiva

// validaciq: 
//    var validator = function(){
//    return {
//        
//        validateEngineVolume: function(value){
//            if(value < 600 || value >5000)
//                {
//                    toaster.error("Engine volume must be between 600 and 900!");
//                }
//        },
//    }
//};

//    var isValidDate = function (day, month, year) {
//    if (subject.match(/^(?:(0[1-9]|1[012])[\- \/.](0[1-9]|[12][0-9]|3[01])[\- \/.](19|20)[0-9]{2})$/)) {
//        toastr.error("Invlaid date!");
//    } 
//};

var globalRowCounter = 1;

function dateValidator(inputDate) {
    var pattern = /(^(((0[1-9]|1[0-9]|2[0-8])[-](0[1-9]|1[012]))|((29|30|31)[-](0[13578]|1[02]))|((29|30)[-](0[4,6,9]|11)))[-](19|[2-9][0-9])\d\d$)|(^29[-]02[-](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
    
    return pattern.test(inputDate);
}

function arrayContainsNullValue(someArray) {
    for(var i = 0; i < someArray.length; i += 1) {
        if(someArray[i] === null) {
            return true;
        }
    }
    
    return false;
}

function getFieldsValues() {
    //debugger;
    var carBrand = document.getElementById("car-model").value,
        regDay = document.getElementById("reg-day").value,
        engineVolume = document.getElementById("input-volume").value,
        additionalInformation = document.getElementById("input-info").value;

    var allValue = new Array();
    allValue.push(carBrand);
    allValue.push(regDay);
    allValue.push(engineVolume);
    allValue.push(additionalInformation);

    return allValue;
};
//Logic for creating table row buttons

function createButton(container, innerContentAsText) {
    var myButton = document.createElement('button');
    
//'type', 'button' same as type = "button"
    myButton.setAttribute('type', 'button');
    myButton.setAttribute('class', 'btn btn-default');
    myButton.setAttribute('id', globalRowCounter);
    myButton.innerText = innerContentAsText;
    myButton.style.padding = '5px';
    myButton.style.textAlign = 'center';
    container.appendChild(myButton);
}

var savebutton = document.getElementById("submit-button");
var newbutton = document.getElementById("new-button");

var editButton,
    removeButton;

savebutton.addEventListener('click', function () {
    
    getFieldsValues();
    
    if(getFieldsValues().length < 4 || arrayContainsNullValue(getFieldsValues())) {
        toastr.error("Some fields are empty!");
    } 
     
    else if(dateValidator(getFieldsValues()[1]) === false) {
        toastr.error("Invalid date format!");
    }
    
    else if(getFieldsValues()[3].length < 5) {
        toastr.error("Additional info must be at least 5 symbols long!");
    }
    
    else {
        var table = document.getElementById("record-table").getElementsByTagName("tbody")[0];
        var tableRow = table.insertRow(table.rows.length);
        tableRow.setAttribute('id', globalRowCounter);

        var carModelCell = tableRow.insertCell(0);
        carModelCell.innerText = getFieldsValues()[0];

        var registrationDateCell = tableRow.insertCell(1);
        registrationDateCell.innerText = getFieldsValues()[1];

        var engineVolumeCell = tableRow.insertCell(2);
        engineVolumeCell.innerText = getFieldsValues()[2];

        var additionalInformationCell = tableRow.insertCell(3);
        additionalInformationCell.innerText = getFieldsValues()[3];

        var editRowButtonCell = tableRow.insertCell(4);
        createButton(editRowButtonCell, 'Edit');

        var removeRowButtonCell = tableRow.insertCell(5);
        createButton(removeRowButtonCell, 'Remove');

        toastr.success("Record added successfully!");
        globalRowCounter += 1;
        //create a button to remove row by taking row id
    }
});