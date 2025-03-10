export const Topbar = () => {
  const handleClose = () => {
    window.electron.ipcRenderer.send('close-window')
  }

  const handleMinimize = () => {
    window.electron.ipcRenderer.send('minimize-window')
  }

  return (
    <div>
      <div className="topbar rounded-t-xl bg-blue-400 w-screen h-5"></div>
      <div className="bg-blue-400 w-screen h-4"></div>
      <div id="control-buttons" className="text-stone-200 absolute top-1 right-0 pe-2">
        <button
          id="minimize"
          className="pr-1"
          style={{ fontSize: '20px' }}
          onClick={handleMinimize}
        >
          &#128469;
        </button>
        <button id="close" className="px-1" style={{ fontSize: '18px' }} onClick={handleClose}>
          &#10006;
        </button>
      </div>
    </div>
  )
}
