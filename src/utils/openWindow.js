
export default function openWindow(url) {
  const newWindow = window.open(url)
  console.log(newWindow)
  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus()
  }
}

