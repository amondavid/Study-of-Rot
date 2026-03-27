document.querySelectorAll('.illustration').forEach(image => {
  image.addEventListener('click', () => { 
  window.open(image.src)
})
})

//document.querySelectorAll('.illustration') scans all pages for elements with the class 'illustration.
//.forEach(image => creates a for loop, I labeled the items 'image'
//'click' is a predefined event, clicking atcivates the event