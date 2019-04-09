var arr = []

if(arr===false){
    console.log(true)
}else{
    console.log(false)
}

// class Manusia {
//     constructor(nama,umur){
//         this.nama = nama
//         this.umur = umur
//     }
// }

// var obj = new Manusia('Fikri','100')
// console.log(obj)

function Manusia(a,b){
    return{
        nama : a,
        umur : b
    }
}

var obj = Manusia('Fikri','100')
console.log(obj)
