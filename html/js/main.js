var data = {
    "D01": [
        { "dname": "IOS" }
    ],
    "D02": [
        { "dname": "Android" }
    ],
    "D03": [
        { "dname": "Mean Stack" }
    ],
    "D04": [
        { "dname": "Game Development" }
    ]
}
const deptid = {
    "IOS": "D01",
    "Android": "D02",
    "MEAN Stack": "D03",
    "Game Development": "D04"
}
const validation = {
    "strlen": "Atleast 3 letters are required",
    "require": "This Field is required.",
    "stringonly": "Enter string data.",
    "passlength": "Password length should be in range 6-10",
    "salary": ["Too large", "Too short"],
    "eid": ["Should start from letter 'E'", "Length must be of 3 letters", "Must include at least one digit"]

}
$(document).ready(function () {
    document.getElementById("second").style.display = "none";
    document.getElementById("first").style.display = "block";
})
function next() {
    var val = document.getElementById("dept");
    var dept = val.options[val.selectedIndex].value;

    if (dept != "") {
        document.getElementById("second").style.display = "block";
        document.getElementById("first").style.display = "none";
        return;
    }
    alert("Select Department!")
}
function back() {
    document.getElementById("second").style.display = "none";
    document.getElementById("first").style.display = "block";
}
function setID() {
    var val = document.getElementById("dept");
    var dept = val.options[val.selectedIndex].value;
    if (dept !== "") {
        document.getElementById("d_id").value = deptid[dept];
        document.getElementById("did").value = deptid[dept];
        return;
    }
    document.getElementById("d_id").value = "";
}

function validate(e, err) {
    let str = e.value;
    if (str.trim().length < 3) {
        err.innerHTML = validation['strlen'];
        err.style.display = "block";
    }
    else {
        err.style.display = "none";
    }
}
function getControl(e) {
    if (e.id == 'fname') {
        validate(e, document.getElementsByClassName('err')[0])
    }
    else if (e.id == 'lname') {
        validate(e, document.getElementsByClassName('err')[1])
    }
}
function validPass(e) {
    const pass = e.value;
    const err = document.getElementsByClassName('err')[2];
    if (pass.length < 6 || pass.length > 10) {
        err.innerHTML = validation['passlength']
        err.style.display = "block";
        return;
    }
    err.style.display = "none";
}
function checksal(e) {
    const err = document.getElementsByClassName('err')[4];
    if (e.value < 5000) {
        err.innerHTML = validation.salary[1];
        err.style.display = 'block';
        return;
    }
    else if (e.value > 100000) {
        err.innerHTML = validation.salary[0];
        err.style.display = 'block';
        return;
    }
    else if (e.value == "") {
        err.innerHTML = validation.require;
        err.style.display = 'block';
        return;
    }
    err.style.display = 'none';
}
function addemp() {
    const err = document.getElementsByClassName('err');
    let emp = document.getElementsByTagName("input");
    var val = document.getElementById("dept");
    const did = emp[0].value;
    var dept = val.options[val.selectedIndex].value;
    if (emp[1].value == "") {

    }
    let employee = {};
    switch ("") {
        case emp[1].value:
            err[0].innerHTML = validation.require;
            err[0].style.display = 'block';
            return;
        case emp[2].value:
            err[1].innerHTML = validation.require;
            err[1].style.display = 'block';
            return;
        case emp[3].value:
            err[2].innerHTML = validation.require;
            err[2].style.display = 'block';
            return;
        case emp[5].value:
            err[4].innerHTML = validation.require;
            err[4].style.display = 'block';
            return;
        case emp[6].value:
            err[5].innerHTML = validation.require;
            err[5].style.display = 'block';
            return;
        default:
            err[5].style.display = 'none';
    }

    let bool = data[emp[7].value].slice(1).some(id => {

        return id.empid == emp[6].value;
    })
    if (!bool) {
        employee.fname = emp[1].value;
        employee.lname = emp[2].value;
        employee.password = emp[3].value;
        employee.dob = emp[4].value;
        employee.salary = emp[5].value;
        employee.empid = emp[6].value;
        data[did].push(employee);
        showInTable(emp[7].value);
        for (let i = 0; i < emp.length; i++) {
            emp[i].value = ""
        }
        document.getElementById("first").style.display = "block";
        document.getElementById("second").style.display = "none";
    } else {
        alert("Employee already exist!");
        for (let i = 0; i < emp.length; i++) {
            emp[i].value = ""
        }
    }
}
function showInTable(did) {
    let edata = data[did][data[did].length - 1];
    addRow(edata, did);
}
function filter() {
    let val = document.getElementById("filt");
    var dept = val.options[val.selectedIndex].value;
    switch (dept) {
        case "All":
            showAllEmp();
            break;
        default:
            showDeptEmp(dept);
    }
}
function showAllEmp() {
    removeExisting().then(() => {
        document.getElementById("tbldiv").style.display = "block";
        for (let did in data) {
            for (i = 1; i < data[did].length; i++) {
                addRow(data[did][i], did);
            }
        }
    }).catch((err)=>{
        console.log(err);
    })
}
function addRow(emp, did) {
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(emp.fname));
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(emp.lname));
    tr.appendChild(td2);

    let td3 = document.createElement("td");
    td3.appendChild(document.createTextNode(emp.dob));
    tr.appendChild(td3);

    let td4 = document.createElement("td");
    td4.appendChild(document.createTextNode(emp.salary));
    tr.appendChild(td4);
    let td5 = document.createElement("td");
    td5.appendChild(document.createTextNode(emp.empid));
    tr.appendChild(td5);

    let td7 = document.createElement("td");
    td7.appendChild(document.createTextNode(did));
    tr.appendChild(td7)

    let td6 = document.createElement("td");
    td6.appendChild(document.createTextNode(data[did][0].dname));
    tr.appendChild(td6);

    let tbl = document.getElementById('tbl');
    tbl.appendChild(tr);
}
function showDeptEmp(dept) {
    removeExisting().then(() => {
        let did = deptid[dept];
        if (data[did].length < 2) {
            document.getElementById("tbldiv").style.display = "none";
        }
        else {
            document.getElementById("tbldiv").style.display = "block";
            for (i = 1; i < data[did].length; i++) {
                addRow(data[did][i], did)
            }
        }
    }).catch((err) => {
        console.log(err);
    })
}
function removeExisting() {
    return new Promise((resolve, reject) => {
        let table = document.getElementById("tbl")
        let tb = table.rows.length;
        for (let i = 1; i < tb; i++) {
            table.deleteRow(1);
        }
        resolve();
    })
}
function sortTable(e) {
    switch (e.innerHTML) {
        case "First Name":
            sortBy("fname");
            break;
        case "Last Name":
            sortBy("lname");
            break;
        case "First Name":
            sortBy("fname");
            break;
        case "Salary":
            sortBy("salary");
            break;
        case "Employee ID":
            sortBy("empid");
            break;
        case "Department":
            sortBy("dname");
            break;
    }
}
function sortBy(str) {
    let val = document.getElementById("filt");
    var dept = val.options[val.selectedIndex].value;
    if (dept == "All") {
        key = Object.keys(data);
        let allobj = [];
        for (let i = 0; i < key.length; i++) {

            data[key[i]].slice(1).forEach(element => {
                element.did = key[i];
                element.dname = data[key[i]][0].dname;
                allobj.push(element);
            });
        }
        let sortedobjects = allobj.sort((a, b) => (a[str] > b[str]) ? 1 : -1);
        removeExisting().then(() => {
            for (let i = 0; i < sortedobjects.length; i++) {
                addRow(sortedobjects[i], sortedobjects[i].did);
            }
        })

    }
    else {
        let sortedobjects = data[deptid[dept]].slice(1).sort((a, b) => (a[str] > b[str]) ? 1 : -1);
        removeExisting().then(() => {
            showtable(sortedobjects, deptid[dept]);
        }).catch((err) => {
            console.log(err);
        })

    }
}
function showtable(sortedobjects, did) {
    for (i = 0; i < sortedobjects.length; i++) {
        addRow(sortedobjects[i], did);
    }
}
