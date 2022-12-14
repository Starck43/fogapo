import {memo} from "react"

const Loading = () => <div style={{
  position: "fixed",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  transition: "all 150ms ease",
  backgroundColor: "rgba(255,255,255, .3)",
  zIndex: 9999
}}/>

export default memo(Loading)
