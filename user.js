// const BASE_URL = 'http://localhost:8000';

// window.onload = async () => {
//     await loadData();
// };

// const loadData = async () => {
//     console.log('user page loaded');
//     //1.load user ทั้งหมด จาก api ที่เตรียมไว้
//     const response = await axios.get(`${BASE_URL}/users`);
//     console.log(response.data);

//     const userDOM = document.getElementById('user');
    
//     //2. นำ user ทั้งหมด โหลดกลับเข้าไปใน html
//     let htmlData = '<div>';
//     for (let i = 0; i < response.data.length; i++) {
//         let user = response.data[i];
//         htmlData += `<div> 
//         ${user.id} ${user.firstname} ${user.lastname}
//         <a href='index2_web.html?id=${user.id}'><button>Edit</button></a>
//         <button class = 'delete' data-id='${user.id}'>Delete</button> 
//         </div>`
//     }
//     htmlData += '</div>'
//     userDOM.innerHTML = htmlData

//     //3. ลบ user
//     const deleteDOMs = document.getElementsByClassName('delete');
//     for (let i = 0; i < deleteDOMs.length; i++) {
//         deleteDOMs[i].addEventListener('click', async (event) => {
//             //ดึง id ของ user ที่ต้องการลบ
//             const id = event.target.dataset.id;
//             try {
//                 await axios.delete(`${BASE_URL}/users/${id}`);
//                 loadData(); // recursive function = เรียกใช้ function ตัวเอง
//             } catch (error) {
//                 console.log('error', error);
//             }
//         });
//     }
// };
// //teacher's code


const BASE_URL = 'http://localhost:8000';

window.onload = async () => {
    await loadData();
};

const loadData = async () => {
    console.log('User page loaded');

    try {
        // 1. Load user data from API
        const response = await axios.get(`${BASE_URL}/users`);
        console.log(response.data); // Check the data received

        const userDOM = document.getElementById('user');
        
        // 2. Display user data in a table
        let htmlData = '';
        response.data.forEach(user => {
            htmlData += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>
                        <a href='index2_web.html?id=${user.id}'>
                            <button class="edit">Edit</button>
                        </a>
                        <button class="delete" data-id='${user.id}'>Delete</button>
                    </td>
                </tr>
            `;
        });

        userDOM.innerHTML = htmlData;

        // 3. Add event listeners for Edit and Delete buttons
        attachEventListeners();
    } catch (error) {
        console.error('Failed to load user data:', error);
        alert('An error occurred while loading user data.');
    }
};

const attachEventListeners = () => {
    // Edit button functionality
    document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', (event) => {
            const row = event.target.closest('tr'); // Locate the row
            const cells = row.getElementsByTagName('td');
            
            // Example: Populate form fields with existing data
            document.getElementById('inputName').value = cells[1].textContent; // First name
            document.getElementById('inputEmail').value = cells[2].textContent; // Last name

            // Optionally display the form for editing
            document.getElementById('editForm').style.display = 'block';
        });
    });

    // Delete button functionality
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', async (event) => {
            const confirmDelete = confirm('Are you sure you want to delete this data?');
            if (confirmDelete) {
                const userId = event.target.getAttribute('data-id');
                try {
                    await axios.delete(`${BASE_URL}/users/${userId}`);
                    const row = event.target.closest('tr');
                    row.remove(); // Remove the row from the table
                } catch (error) {
                    console.error('Error deleting user:', error);
                    alert('An error occurred while deleting the user.');
                }
            }
        });
    });
};

// Optional: Add a UI animation on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".overlay").style.transform = "translateX(0)";
});

document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
        const row = this.closest('tr'); // หาแถวที่ต้องการลบ
        row.remove(); // ลบแถวออกจากตาราง
        alert('User has been deleted successfully!');
    });
});

// insert user
async function submitData(event) {
    event.preventDefault();
    
    const userData = {
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        age: document.getElementById("age").value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        interests: Array.from(document.querySelectorAll('input[name="interest[]"]:checked')).map(checkbox => checkbox.value).join(", "),
        description: document.getElementById("description").value
    };

    try {
        const response = await fetch("http://localhost:8880/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById("message").innerText = "User inserted successfully!";
            document.getElementById("message").style.display = "block";

            setTimeout(() => {
                window.location.href = "user.html"; // ไปยังหน้าจัดการผู้ใช้
            }, 2000);

        } else {
            throw new Error(result.error || "Failed to save data");
        }

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").innerText = "Error saving data!";
        document.getElementById("message").style.display = "block";
    }
}

// ฟังก์ชันเปิดป๊อปอัป
function openPopup() {
    document.getElementById("popup").classList.remove("hidden");
}

// ฟังก์ชันปิดป๊อปอัป
function closePopup() {
    document.getElementById("popup").classList.add("hidden");
}

// ฟังก์ชันส่งข้อมูล
async function submitForm(event) {
    event.preventDefault();

    const userId = document.getElementById("userId").value;
    const userFirstname = document.getElementById("userFirstname").value;
    const userLastname = document.getElementById("userLastname").value;

    const userData = {
        id: userId,
        firstname: userFirstname,
        lastname: userLastname
    };

    try {
        const response = await axios.post("http://localhost:8880/users", userData);
        
        // แสดงข้อความหลังจากส่งข้อมูลสำเร็จ
        document.getElementById("message").innerText = response.data.message;
        document.getElementById("message").style.display = "block";

        // ปิดป๊อปอัป
        closePopup();

        // รีเฟรชตารางแสดงข้อมูล
        loadUsers();
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").innerText = "Error inserting data!";
        document.getElementById("message").style.display = "block";
    }
}

// ฟังก์ชันโหลดข้อมูลจากฐานข้อมูล MySQL
async function loadUsers() {
    try {
        const response = await axios.get("http://localhost:8880/users");
        const users = response.data;

        const userTable = document.getElementById("user");
        userTable.innerHTML = ""; // เคลียร์ข้อมูลในตารางก่อน

        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td>
                    <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
                </td>
            `;
            userTable.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading users:", error);
    }
}

// เรียกใช้ฟังก์ชันเมื่อหน้าโหลด
document.addEventListener("DOMContentLoaded", loadUsers);
