const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();

const port = 8000;
app.use(bodyParser.json());

let users = []

let conn = null

const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8830
    })
}

/*
GET /users สำหรับแสดงข้อมูล user ทั้งหมดที่บันทึกไว้
POST /users สำหรับสร้างข้อมูล user ใหม่บันทึกเข้าไป
GET /users/:id สำหรับดึง user รายคนออกมา
PUT /users/:id สำหรับแก้ไขuser รายคน (ตาม id ที่บันทึกเข้าไป)
DELETE /users/:id สำหรับลบ user รายคน (ตาม id ที่บันทึกเข้าไป)
*/


/*
app.get('/testdbnew', async (req, res) => {

    try {
        const results = await conn.query('SELECT * FROM users')
        res.json(results[0])
    } catch (error) {
        console.log('error', error.message)
        res.status(500).json({error: 'Error fetching users'})
    }
})
*/

// path = GET /users สำหรับ get users รายคนออกมา
app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users')
    res.json(results[0])
})

// path = POST /users สำหรับสร้าง users ใหม่บันทึกเข้าไป
app.post('/users', async (req, res) => {
    let user = req.body;
    const results = await conn.query('INSERT INTO users SET ?', user)
    console.log('results', results)
    res.json({
        message: 'Create user successfully',
        data: results[0]
    })
})


//path: GET /users/:id ใช้สำหรับแก้ไขข้อมูล user ที่มี id ตามที่ระบุ
app.get('/users/:id', (req, res) => {
    let id = req.params.id;
    let updateUser = req.body; 
    let selectedIndex = users.findIndex(user => user.id == id)

        users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname
        users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname
        users[selectedIndex].age = updateUser.age || users[selectedIndex].age
        users[selectedIndex].gender = updateUser.gender || users[selectedIndex].gender

    res.json({
        message: 'Update user successfully',
        data: {
            user: updateUser,
            indexUpdated: selectedIndex
        }
    })
})

// path: DELETE /user/:id ใช้สำหรับลบข้อมูล user ที่มี id ตามที่ระบุ
app.delete('/users/:id', (req, res) => {
    let id = req.params.id;
    // หา index ของ user ที่ต้องการลบ
    let selectedIndex = users.findIndex(user => user.id == id)

    //ลบ
    users.splice(selectedIndex, 1)
    res.json({
        message: 'Delete user successfully',
        indexDeleted: selectedIndex
    })
})

app.listen(port, async (req, res) => {
    await initMySQL()
    console.log('Http Server is running on post' + port)
});