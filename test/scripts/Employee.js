//Load Data in Table when documents is ready  
$(document).ready(function () {
    loadData();
});

//Load Data function  
function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.ID + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Email + '</td>';
                html += '<td>' + item.City + '</td>';
                html += '<td>' + item.MobileNo+ '</td>';
                html += '<td>' + item.Education + '</td>';
                //html += '<td><img src="' + item.Photo +'" height="50px" width="50px" ></td>';
                
                html += '<td>' + item.Hobby + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.ID + ')">Edit</a> | <a href="#" onclick="Delele(' + item.ID + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function   
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        ID: $('#ID').val(),
        Name: $('#Name').val(),
        Email: $('#Email').val(),
        City: $('#City').val(),
        MobileNo: $('#MobileNo').val(),
        Education: $('#Education').val(),
        //Photo: $('#Photo').val(),
        Hobby: $('#Hobby').val()
    };
    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon Employee ID  
function getbyID(EmpID) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#City').css('border-color', 'lightgrey');
    $('#MobileNo').css('border-color', 'lightgrey');
    $('#Education').css('border-color', 'lightgrey');
    //$('#Photo').css('border-color', 'lightgrey');
    $('#Hobby').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Home/getbyID/" + EmpID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#ID').val(result.ID);
            $('#Name').val(result.Name);
            $('#Email').val(result.Email);
            $('#City').val(result.City);
            $('#MobileNo').val(result.MobileNo);
            $('#Education').val(result.Education);
            //$('#Photo').val(result.Photo);
            $('#Hobby').val(result.Hobby);


            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating employee's record  
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        ID: $('#ID').val(),
        Name: $('#Name').val(),
        Email: $('#Email').val(),
        City: $('#City').val(),
        MobileNo: $('#MobileNo').val(),
        Education: $('#Education').val(),
        //Photo: $('#Photo').val(),
        Hobby: $('#Hobby').val()
    };
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#ID').val("");
            $('#Name').val("");
            $('#Email').val("");
            $('#City').val("");
            $('#MobileNo').val("");
            $('#Education').val("");

            //$('#Photo').val("");
            $('#Hobby').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record  
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//function to load data first time
loadData();

//Function for clearing the textboxes  
function clearTextBox() {
    $('#ID').val("");
    $('#Name').val("");
    $('#Email').val("");
    $('#City').val("");
    $('#MobileNo').val("");
    $('#Education').val("");
    //$('#Photo').val("");
    $('#Hobby').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#City').css('border-color', 'lightgrey');
    $('#MobileNo').css('border-color', 'lightgrey');
    $('#Education').css('border-color', 'lightgrey');
    //$('#Photo').css('border-color', 'lightgrey');
    $('#Hobby').css('border-color', 'lightgrey');
}
//Valdidation using jquery  
function validate() {
    var isValid = true;

    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }

    if ($('#Email').val().trim() == "") {
        $('#Email').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Email').css('border-color', 'lightgrey');
    }

    if ($('#City').val().trim() == "") {
        $('#City').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#City').css('border-color', 'lightgrey');
    }

    if ($('#MobileNo').val().trim() == "") {
        $('#MobileNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#MobileNo').css('border-color', 'lightgrey');
    }


    if ($('#Education').val().trim() == "") {
        $('#Education').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Education').css('border-color', 'lightgrey');
    }
    //if ($('#Photo').val().trim() == "") {
    //    $('#Photo').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#Photo').css('border-color', 'lightgrey');
    //}

    if ($('#Hobby').val().trim() == "") {
        $('#Hobby').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Hobby').css('border-color', 'lightgrey');
    }
    return isValid;
}  