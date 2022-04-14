import React from "react";
import { Example } from "./components/example";
import { Home } from "./components/Home";
import { Loading } from "./components/loading";
import { ThreeJS } from "./components/temp/threeJS";

export default function App(props: any) {

  const [isLoading, setLoading] = React.useState(false);

  return <>
    {isLoading && <Loading></Loading>}
    <Home></Home>
  </>
}

