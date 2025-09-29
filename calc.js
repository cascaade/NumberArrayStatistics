let calculate = document.getElementById('calculate')
let generate = document.getElementById('generate')
let rawarr = document.getElementById('array')
let rawarrdisplay = document.getElementById('rawarrdisplay')
let arrdisplay = document.getElementById('arrdisplay')
let sumdisplay = document.getElementById('sumdisplay')
let rangedisplay = document.getElementById('rangedisplay')
let meandisplay = document.getElementById('meandisplay')
let maddisplay = document.getElementById('maddisplay')
let meddisplay = document.getElementById('meddisplay')
let modedisplay = document.getElementById('modedisplay')
let dotplotelem = document.getElementById('dotplot')
let ctx = dotplotelem.getContext('2d')

function sort(arr) {
  arr = arr.sort((a, b) => a - b)
  return arr;
}

function sum(arr) {
  let sum = 0
  for (let num of arr) {
    sum += num
  }
  return sum;
}

function range(arr) {
  return Math.abs(arr[0] - arr[arr.length - 1])
}

function mean(arr) {
  return Math.trunc((sum(arr) / arr.length) * 1000) / 1000;
}

function mad(arr) {
  let newarr = []
  let marr = mean(arr)
  for (let num of arr) {
    newarr.push(Math.abs(num - marr))
  }
  return mean(newarr);
}

function median(arr) {
  if (arr.length % 2 !== 0) {
    return arr[Math.floor(arr.length / 2)]
  } else {
    return (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2;
  }
}

function mode(arr) {
  const arrobj = {}

  arr.forEach(elem => {
    if (!arrobj[elem]) arrobj[elem] = 0
    arrobj[elem]++
  })

  let result = []
  let max = 0

  for (let key in arrobj) {
    if (arrobj[key] > max) {
      result = [key]
      max = arrobj[key]
    } else if (arrobj[key] === max) {
      result.push(key)
    }
  }

  if (Object.keys(arrobj).length === result.length) {
    result = []
  }

  return result;
}

function dotplot(arr) {
  const arrobj = {}

  arr.forEach(elem => {
    if (!arrobj[elem]) arrobj[elem] = 0
    arrobj[elem]++
  })

  let x = (dotplotelem.width / 2 - ((Object.keys(arrobj).length) * 30 / 2)) + 20

  for (let key in arrobj) {
    let y = 10
    for (let amnt = arrobj[key]; amnt > 0; amnt--) {
      ctx.fillRect(x, y, 10, 10)
      y += 20
    }
    x += 20
  }
}

let arrayresult = []

function calc() {
  let array = []
  let splitrawarray = rawarr.value.split(", ")
  if (splitrawarray.length == 1) {
    for (let num of splitrawarray) {
      splitrawarray = rawarr.value.split(",")
    }
  }
  for (let num of splitrawarray) {
    array.push(parseInt(num))
  }
  arrayresult = splitrawarray
  dotplot(array)
  rawarrdisplay.innerHTML = array
  arrdisplay.innerHTML = sort(array)
  sumdisplay.innerHTML = sum(array)
  rangedisplay.innerHTML = range(sort(array))
  meandisplay.innerHTML = mean(sort(array))
  maddisplay.innerHTML = mad(sort(array))
  meddisplay.innerHTML = median(sort(array))
  modedisplay.innerHTML = mode(sort(array))
  if (window.innerHeight <= 800) {
    document.getElementById("rightside").scrollIntoView(true)
  }
  console.log(window.innerWidth)
}

function entercalc(e) {
  if (e.keyCode == 13) {
    calc()
  }
}

function gen() {
  let arr = []
  let min = Math.floor(document.getElementById('min').value)
  let max = Math.floor(document.getElementById('max').value)
  let amnt = Math.floor(document.getElementById('nums').value)
  for (let i = 0; arr.length < amnt - 1; i++) {
    let rando = Math.floor(Math.random() * (Math.abs(max - min))) + min
    arr.push(rando)
  }
  arr.push(max)
  rawarr.value = arr
  calc()
}

generate.addEventListener('click', gen)
calculate.addEventListener('click', calc)
window.addEventListener('keydown', entercalc)

let print = document.getElementById('print')
let share = document.getElementById('share')

print.addEventListener('click', function() {
  if (arrayresult.length != 0) {
    window.open("./print/?arr=" + arrayresult)
  }
})

share.addEventListener('click', function() {
  if (arrayresult.length != 0) {
    window.open("./link/?arr=" + arrayresult)
  }
})