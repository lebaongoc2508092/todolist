//  getting all required element
const inputBox = document.querySelector('.inputList input');
const btnAdd = document.querySelector('.inputList button');
const todoList = document.querySelector('.todoList');
const deleteAll = document.querySelector('.footer button');

showTask()// funciton show thông tin người dùng nhập vào view

inputBox.onkeyup = () => {
    let userData = inputBox.value;// lấy thông tin người dùng nhập vào
    if(userData.trim() != 0){
        btnAdd.classList.add('active') // khi có thông tin nhập vào thì active button

    }else{
        btnAdd.classList.remove('active') // khi không có thông tin nhập vào thì bỏ active button
    }
}

// nếu người nhập click vào button
btnAdd.onclick = () => {
    let userData = inputBox.value;// lấy thông tin người dùng nhập vào
    let getLocalStorage = localStorage.getItem('New item');//lưu vào bộ nhớ cục bộ
    if(getLocalStorage == null){
        listArr = []// tạo ra mảng trống
    }else{
        listArr = JSON.parse(getLocalStorage);// chuyển đổi chuỗi json thành đối tượng js object
    }
    listArr.push(userData);// đẩy dữ liệu vào userData
    localStorage.setItem('New item',JSON.stringify(listArr))// chuyển đổi js object thành chuỗi
    showTask()
    btnAdd.classList.remove('active') // khi không có thông tin nhập vào thì bỏ active button

}

function showTask(){
    let getLocalStorage = localStorage.getItem('New item');// lấy dữ liệu từ bộ nhớ cục bộ
    if(getLocalStorage == null){
        listArr = []// tạo ra mảng trống
    }else{
        listArr = JSON.parse(getLocalStorage);// chuyển đổi chuỗi json thành đối tượng js object
    }
    const number = document.querySelector('.number');
    number.textContent = listArr.length;
    if(listArr.length > 0){
        deleteAll.classList.add('active');
    }else{
        deleteAll.classList.remove('active');

    }
    let newItem = '';
    listArr.forEach((element, index) => {
        newItem += `<li>${element}<span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`
    });
    todoList.innerHTML = newItem;// render view
    inputBox.value = '';// sau khi thêm một node sẽ để trống ô input
}
// function deleteItem
function deleteTask(index){
    let getLocalStorage = localStorage.getItem('New item');
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index,1);// Xóa đi 1 phần tử cụ thể trong thẻ li
    // Sau khi xóa thì update lại localstorage và gọi lại hàm showTask
    localStorage.setItem('New item',JSON.stringify(listArr))// chuyển đổi js object thành chuỗi
    showTask()

}
//  xóa toàn bộ
deleteAll.onclick= () => {
    listArr = [];
    localStorage.setItem('New item',JSON.stringify(listArr))// chuyển đổi js object thành chuỗi
    showTask()
}