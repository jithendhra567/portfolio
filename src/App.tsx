import React from "react";
import { Example } from "./components/example";
import { Home } from "./components/Home";
import { Loading } from "./components/loading";
import Not from "./components/Not";
import { ThreeJS } from "./components/temp/threeJS";

export default function App(props: any) {
  const width = window.outerWidth;
  if(width<1000){
    return <Not />
  }
  return <Home/>
}

