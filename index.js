const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')

app.use(bodyParser.json())

//array kosong untuk input user
let users = []
//buat dapat tahun sekarang secara actual
let tahunSekarang = new Date().getFullYear()

//dapetin semua data user
app.get('/users', (req, res) => {
    res.send(users)
})

//create data user baru
app.post('/users', (req,res) => {
    var name = req.body.name
    var tanggal = req.body.tanggal
    var bulan = req.body.bulan
    var tahun = req.body.tahun
    var pekerjaan = req.body.pekerjaan

    //fungsi validator
    const validator = () =>{
        if(typeof name !== 'string'){
            if(!name ){
                throw new Error('Mohon input nama dengan benar(string) dan tidak boleh kosong!')
            }
        } else {
            users.push(name)
        }
        if(typeof tanggal !== 'number'){
            throw new Error('Mohon input tanggal dengan benar(number) dan tidak boleh kosong!')
        }
        if(typeof bulan !== 'number'){
            throw new Error('Mohon input bulan dengan benar(number) dan tidak boleh kosong!')
        }
        if(typeof tahun !== 'number'){
            throw new Error('Mohon input tahun dengan benar(number) dan tidak boleh kosong!')
        }
        if(!tanggal){
                throw new Error('Mohon input tanggal dengan benar(number) dan tidak boleh kosong!')
        }
        if(tanggal < 1 || tanggal > 31){
                throw new Error('Mohon input tanggal dengan benar(antara angka 1 sampai 31)')
        }
        if(!bulan && bulan < 1 || bulan > 12){
                throw new Error('Mohon input bulan dengan benar(number) dan tidak boleh kosong!')
        } else {
            if(bulan < 10 && bulan > 0){
                bulan = `0${bulan}`
            }
        }
        if(!tahun){
                throw new Error('Mohon input tahun dengan benar(number) dan tidak boleh kosong!')
        }
        var tanggalLahir = `${tanggal}/${bulan}/${tahun}`
        users.push(tanggalLahir)
        var umur = tahunSekarang - tahun
        users.push(umur)
        if(pekerjaan !== 'swasta' && pekerjaan !== 'wiraswasta'){
            throw new Error('Mohon input pekerjaan dengan pilihan antara swasta dan wiraswasta')
        } else {
            users.push(pekerjaan)
        }
        res.send(users)
    }
    //call validator, bila semua tervalidasi maka data akan dipush ke array user dan ditampilkan
    validator()
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})