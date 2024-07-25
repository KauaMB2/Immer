import {produce} from "immer";

interface ObjProps {
  prop: string,
    obj2:{
      prop:string,
      obj3:{
        prop: string,
        value: number
      }
    }
}

export default function App(){
  const obj={
    prop: "value",
    obj2:{
      prop:"value2",
      obj3:{
        prop: "value3",
        value: 1
      }
    }
  }
  // const objCopy={
  //   ...obj,
  //   obj2:{
  //     ...obj.obj2,
  //     obj3:{
  //       ...obj.obj2.obj3,
  //       value: Math.random()
  //     }
  //   }
  // }
  const handleClick=()=>{
    console.log(obj, produce<ObjProps>(obj, (draft:ObjProps)=>{
      draft.obj2.obj3.value=Math.random()
    }))
  }
  return (
    <>
    <h1>Olhe no console!!!!!!</h1>
    <div>
      <button onClick={handleClick}>Clique aqui</button>
    </div>
    </>
  );
};

