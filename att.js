const add = document.getElementById('add');
const create = document.getElementById('create');
const clear = document.getElementById('clear');
const cancel = document.getElementById('cancel');
const save = document.getElementById('download');
const back = document.getElementById('back');
const idinput = document.getElementById('identity');
const firstinput = document.getElementById('firstName');
const secondinput = document.getElementById('secondName');
//const next = document.getElementById ('next') ;
const turn = document.getElementById('turn');
const rem = document.getElementById ('rem') ;
const back1 = document.getElementById ('back1') ;
const remnum = document.getElementById ('remnum') ;
const cancelrem = document.getElementById ('cancelrem') ;
const remove = document.getElementById ('remove') ;
// localStorage.setItem ("key" , "value") ;
// localStorage.setItem ("ragjhad" , "salem") ;

/**
 * @type {array <{
 * number: Number;
 * id:Number;
 * name: string;
 * status: string;
 * }>}
 */
let students = [
    { number: 1, id: 12345, name: 'John Doe', status: 'none' },
    { number: 2, id: 12346, name: 'John Doe', status: 'none' },
    { number: 3, id: 12347, name: 'John Doe', status: 'none' },
    { number: 4, id: 12348, name: 'John Doe', status: 'none' },
    { number: 5, id: 12349, name: 'John Doe', status: 'none' },
];
/**
 * @type {Number} 
 */
let studentnum = 0;
let cnt = 0;
const addstudent = () => {
    studentnum = window.prompt("How many students you want to add ?", '0');
    console.log('studentnum', studentnum);
    turn.innerHTML = '';
    back.style.display = 'flex';
    if (studentnum > 1) {
        turn.innerHTML = `student ${cnt + 1} :`;
    }
}

function createstudent() {
    console.log(cnt);
    const number = students.length + 1;
    let id = idinput.value;
    let first = firstinput.value;
    let second = secondinput.value;
    let name = first + ' ' + second;
    if (first.trim() == '' || second.trim() == '' || id.trim() == '') {
        window.alert('Please fill all required data as required !');
        firstinput.value = '';
        secondinput.value = '';
        idinput.value = '';
        return;
    }
    /**
    * @type {object{
    * number: Number;
     * id:Number;
     * name: string;
     * status: string;
     * }}
     */
    const item = {
        number: students.length + 1,
        id: Number(id),
        name: name,
        status: 'none'
    };
    students.push(item);
    //localStorage.setItem (String(students.length) , [id , name , 'none']) ;
    firstinput.value = '';
    secondinput.value = '';
    idinput.value = '';
    cnt += 1;
    rendertable();
    if (cnt >= studentnum) {
        back.style.display = 'none';
        cnt = 0;
    }
    turn.innerHTML = `student ${cnt + 1} :`;
}

function updatepresent(idx) {
    students[idx].status = 'present';
    rendertable();
}
function updatelate(idx) {
    students[idx].status = 'late';
    rendertable();
}
function updateabsent(idx) {
    students[idx].status = 'absent';
    rendertable();
}

function cancelrequest() {
    idinput.value = '';
    firstinput.value = '';
    secondinput.value = '';
    back.style.display = 'none';
    cnt = 0;
    back1.style.display = 'none' ;
    remnum.value = '' ;
}

function cleartable() {
    students.forEach((item, idx) => {
        students[idx].status = 'none';
    });
    rendertable();
}

function savearray() {
    const data = [];
    for (let i = 0; i < students.length; i++) {
        let item = [students[i].number, students[i].id, students[i].name, students[i].status];
        data.push(item);
    }
    let csvContent = "data:text/csv;charset=utf-8,";
    data.forEach(function (rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
}

const rendertable = () => {
    const tableElement = document.getElementById('tableElement');
    tableElement.innerHTML = `
    <tr class = "topics">
                <th>Num</th>
                <th>Student ID</th>
                <th>Student Name</th>
                <th colspan="3">Attendence</th>
            </tr>
            ` ;
    let countpresent = 0;
    let countabsent = 0;
    let countlate = 0;
    localStorage.clear();
    students.forEach((item, index) => {
        localStorage.setItem(students[index].number, JSON.stringify(item));
        countabsent += (students[index].status === 'absent');
        countpresent += (students[index].status === 'present');
        countlate += (students[index].status === 'late');
        tableElement.innerHTML += `
        <tr ${item.status === 'present' ? 'class="present"' : ''} ${item.status === 'absent' ? 'class="absent"' : ''} ${item.status === 'late' ? 'class="late"' : ''}>
            <td>${item.number}</td>
            <td>${item.id}</td>
            <td >${item.name}</td>
            <td class = 'aa'><button class="a" onclick="updatepresent(${index})">&#x2705;</button></td>
            <td class = 'bb'><button class="b" onclick="updateabsent(${index})">&#x1F6AB;</button></td>
            <td class = 'cc'><button class="c" onclick="updatelate(${index})">&#x1F559;</button></td>
            
        </tr>
        `
    });
    tableElement.innerHTML += `<tr class = "sta">
    <td colspan="3">statistics</td>
    <td>${countpresent}</td>
    <td>${countabsent}</td>
    <td>${countlate}</td>
</tr>` ;

};

function enter(event) {
    if (event.keyCode === 13)
        createstudent();
}
function enter1(event) {
    if (event.keyCode === 13)
        rem_stu();
}

//in order to import csv file and convert it into array then it will be filled in the table 
window.onload = () => {
    // (A) FILE PICKER
    let picker = document.getElementById("csvFile");

    // (B) READ CSV FILE
    picker.onchange = () => {
        // (B1) GET SELECTED CSV FILE
        let selected = picker.files[0];

        // (B2) READ CSV INTO ARRAY
        let reader = new FileReader();
        reader.addEventListener("loadend", () => {
            // (B2-1) SPLIT ROWS & COLUMNS
            let data = reader.result.split("\r\n");
            for (let i in data) {
                data[i] = data[i].split(",");
            }

            // (B2-2) DONE
            // data = JSON.stringify(data);
            // picker.value = "";
            console.log(data);
            students = [];
            for (let i = 0; i < data.length - 1; i++) {
                students.push({ number: Number(data[i][0]), id: Number(data[i][1]), name: data[i][2], status: data[i][3] });
            }
            rendertable();
        });
        reader.readAsText(selected);
    };

};

function rem_stu () {
    /**
     * @type {string}
     */
    let x = remnum.value ;
    if (x.trim() == '') {
        window.alert ('Please enter the student number') ;
        remnum.value = '' ;
        return ;
    }
    x = Number (x) ;
    let temp = [] ;
    students.forEach((item , index) => {
        if (students[index].number != x)
            temp.push (students[index]) ;
    });
    let y = students.length ;
    console.log (y) ;
    students = [] ;
    temp.forEach((item , idx) => {
        students.push({
            number:students.length + 1 ,
            id:temp[idx].id ,
            name:temp[idx].name , 
            status:temp[idx].status
        }) ;
    });
    let z = students.length ;
    console.log (students.length) ;
    console.log (z) ;
    if (y === z) {
        window.alert ('This student not found') ;
        remnum.value = '' ;
        remnum.value = '' ;
        return ;
    }
    rendertable() ;
    back1.style.display = 'none' ;
    remnum.value = '' ;

}

function display_rem () {
    back1.style.display = "flex" ;
}

rendertable();

cancelrem.onclick = cancelrequest ;
remove.onclick = rem_stu ;
rem.onclick = display_rem ;
save.onclick = savearray;
clear.onclick = cleartable;
create.onclick = createstudent;
add.onclick = addstudent;
cancel.onclick = cancelrequest; 
