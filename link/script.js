const params = new URLSearchParams(window.location.search)
let rawarrdisplay = document.getElementById('rawarrdisplay')
let arrdisplay = document.getElementById('arrdisplay')
let sumdisplay = document.getElementById('sumdisplay')
let rangedisplay = document.getElementById('rangedisplay')
let meandisplay = document.getElementById('meandisplay')
let maddisplay = document.getElementById('maddisplay')
let meddisplay = document.getElementById('meddisplay')
let modedisplay = document.getElementById('modedisplay')

function sort(arr) {
  arr = arr.sort((a, b) => a -b)
  return arr;
}

function sum(arr) {
  let sum = 0
  for(let num of arr) {
    sum += num
  }
  return sum;
}

function range(arr) {
  return Math.abs(arr[0] - arr[arr.length - 1])
}

function mean(arr) {
  return Math.trunc((sum(arr) / arr.length)*1000)/1000;
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
    if(!arrobj[elem]) arrobj[elem] = 0 
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

function calc() {
  let array = params.get('arr')
  array = array.split(",")
  rawarrdisplay.innerHTML = array
  arrdisplay.innerHTML = sort(array)
  sumdisplay.innerHTML = sum(array)
  rangedisplay.innerHTML = range(sort(array))
  meandisplay.innerHTML = mean(sort(array))
  maddisplay.innerHTML = mad(sort(array))
  meddisplay.innerHTML = median(sort(array))
  modedisplay.innerHTML = mode(sort(array))
}

calc()