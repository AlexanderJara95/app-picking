import { useEffect,useState } from "react";
import { FormCheck } from "react-bootstrap";

function SwitchValue(valorSwitch) {
    const [toggle, setToggle] = useState();

    const triggerToggle = () => {
        setToggle( !toggle )
    }

    useEffect(()=>{
        console.log("value",valorSwitch.valorSwitch);
        if(valorSwitch.valorSwitch==='Sí'){
            setToggle(true);
        }else{
            setToggle(false);
        }
    },[]);

  return (
    <FormCheck 
        disabled
        type="switch"
        id="custom-switch"
        checked={toggle}
        onChange={(triggerToggle)}
      />
  );
}

export default SwitchValue;